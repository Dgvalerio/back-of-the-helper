import { Injectable } from '@nestjs/common';

import { GithubCommitRead } from '@/github/commit/read/types';
import { GithubRepositoryReadService } from '@/github/repository/read/service';
import { PrismaService } from '@/prisma.service';
import { translate } from '@vitalets/google-translate-api';

import { Octokit } from 'octokit';

@Injectable()
export class GithubCommitReadService implements GithubCommitRead.Service {
  constructor(
    private prisma: PrismaService,
    private readRepository: GithubRepositoryReadService
  ) {}

  dateNow(dateString: string): string {
    const date = new Date(dateString);

    date.setHours(date.getHours() - 3);

    return date.toISOString();
  }

  simplifyCommit(
    repo: string,
    _: GithubCommitRead.Commit
  ): GithubCommitRead.LoadOutput {
    return {
      repo,
      date: this.dateNow(_.commit.committer.date),
      description: _.commit.message,
      commit: _.html_url,
    };
  }

  removeMerge(
    commits: GithubCommitRead.LoadOutput[]
  ): GithubCommitRead.LoadOutput[] {
    return commits.filter(
      ({ description }) =>
        !description.includes("Merge branch '") &&
        !description.includes('Merge pull request #')
    );
  }

  joinRepositoryCommits(
    commits: GithubCommitRead.LoadOutput[][]
  ): GithubCommitRead.LoadOutput[] {
    const items: GithubCommitRead.LoadOutput[] = [];

    commits.forEach((list) => list.forEach((c) => items.push(c)));

    return items;
  }

  sortCommitsByDate(
    commits: GithubCommitRead.LoadOutput[]
  ): GithubCommitRead.LoadOutput[] {
    return commits.sort((a, b) =>
      a.date < b.date ? -1 : a.date > b.date ? 1 : 0
    );
  }

  async load(
    userId: string,
    userEmail: string,
    githubToken: string,
    when?: GithubCommitRead.DateFilter
  ): Promise<GithubCommitRead.LoadOutput[]> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const since =
      when?.since || `${year}-${`0${month}`.slice(-2)}-01T00:00:00Z`;
    const until =
      when?.until || `${year}-${`0${month + 1}`.slice(-2)}-01T00:00:00Z`;

    const defaultConfig = { author: userEmail, per_page: 100, since, until };

    const repositories = await this.readRepository.getAll(userId);

    const octokit = new Octokit({ auth: githubToken });

    const commitsPromise = repositories.map(
      async (repository): Promise<GithubCommitRead.LoadOutput[]> => {
        const [owner, repo] = repository.fullName.split('/');

        const config = { ...defaultConfig, owner, repo };

        const response = await octokit.request(
          'GET /repos/{owner}/{repo}/commits',
          repository.branch
            ? { ...config, sha: repository.branch?.sha }
            : config
        );

        return this.removeMerge(
          response.data.map((commit) => this.simplifyCommit(repo, commit))
        );
      }
    );

    return this.sortCommitsByDate(
      this.joinRepositoryCommits(await Promise.all(commitsPromise))
    );
  }

  async groupByDay(
    commits: GithubCommitRead.LoadOutput[]
  ): Promise<GithubCommitRead.GithubCommitDayGroup[]> {
    const grouped: Record<string, GithubCommitRead.LoadOutput[]> = {};

    commits.forEach((item) => {
      const day = item.date.split('T')[0];

      if (grouped[day]) {
        grouped[day].push(item);
      } else {
        grouped[day] = [item];
      }
    });

    return Object.entries(grouped).map(
      ([day, commit]): GithubCommitRead.GithubCommitDayGroup => ({
        date: day,
        commits: commit.map((c) => ({
          repo: c.repo,
          time: c.date.split('T')[1].split('.')[0],
          description: c.description,
          commit: c.commit,
        })),
      })
    );
  }

  translateConventionalCommits(
    commits: GithubCommitRead.LoadOutput[]
  ): GithubCommitRead.LoadOutput[] {
    const hashmap = {
      feat: 'Desenvolvimento de feature',
      fix: 'Correção/manutenção de bug',
      docs: 'Documentação',
      style: 'Formatação de estilos',
      refactor: 'Refatoração',
      chore: 'Outras alterações',
      test: 'Testes automatizados',
      merge: 'Review de Pull Request',
    };

    return commits.map((commit) => ({
      ...commit,
      description: commit.description.replace(
        /feat|fix|docs|style|refactor|chore|test|merge/i,
        (key) => hashmap[key]
      ),
    }));
  }

  parseLocation(
    commits: GithubCommitRead.LoadOutput[]
  ): GithubCommitRead.LoadOutput[] {
    return commits.map((commit) => ({
      ...commit,
      description: commit.description.replace(
        /\(([\w\-]+)\):/gm,
        (_, location) => ` em "${location}":`
      ),
    }));
  }

  async translateMessage(
    commits: GithubCommitRead.LoadOutput[]
  ): Promise<GithubCommitRead.LoadOutput[]> {
    const promise = commits.map(async (commit) => {
      const [head, message] = commit.description.split(':');
      const { text } = await translate(message, { to: 'pt-br' });

      return { ...commit, description: `${head}: ${text}` };
    });

    return Promise.all(promise);
  }

  async translateCommits(
    commits: GithubCommitRead.LoadOutput[]
  ): Promise<GithubCommitRead.LoadOutput[]> {
    const conventionalTranslated = this.translateConventionalCommits(commits);
    const locationParsed = this.parseLocation(conventionalTranslated);

    return this.translateMessage(locationParsed);
  }

  async simpleLoad(
    userId: string,
    userEmail: string,
    githubToken: string,
    options: GithubCommitRead.Input
  ): Promise<GithubCommitRead.LoadOutput[]> {
    const commits = await this.load(
      userId,
      userEmail,
      githubToken,
      options.when
    );

    return options.translate ? await this.translateCommits(commits) : commits;
  }

  async groupedLoad(
    userId: string,
    userEmail: string,
    githubToken: string,
    options: GithubCommitRead.Input
  ): Promise<GithubCommitRead.GithubCommitDayGroup[]> {
    let commits = await this.load(userId, userEmail, githubToken, options.when);

    if (options.translate) {
      commits = await this.translateCommits(commits);
    }

    return this.groupByDay(commits);
  }
}
