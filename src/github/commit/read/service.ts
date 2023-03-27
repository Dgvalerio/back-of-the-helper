import { Injectable } from '@nestjs/common';

import { GithubCommitRead } from '@/github/commit/read/types';
import { GithubRepositoryReadService } from '@/github/repository/read/service';
import { PrismaService } from '@/prisma.service';

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
    githubToken: string
  ): Promise<GithubCommitRead.LoadOutput[]> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const since = `${year}-${`0${month}`.slice(-2)}-01T00:00:00Z`;
    const until = `${year}-${`0${month + 1}`.slice(-2)}-01T00:00:00Z`;

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

  async loadGroupedByDay(
    userId: string,
    userEmail: string,
    githubToken: string
  ): Promise<GithubCommitRead.GithubCommitDayGroup[]> {
    const commits = await this.load(userId, userEmail, githubToken);

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
}
