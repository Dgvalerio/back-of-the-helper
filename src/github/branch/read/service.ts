import { Injectable, NotFoundException } from '@nestjs/common';

import { GithubBranchRead } from '@/github/branch/read/types';
import { PrismaService } from '@/prisma.service';
import { UserReadService } from '@/user/read/service';

import { Octokit } from 'octokit';

@Injectable()
export class GithubBranchReadService implements GithubBranchRead.Service {
  constructor(
    private prisma: PrismaService,
    private readUser: UserReadService
  ) {}

  async checkRepositoryExists(
    userId: string,
    repository: string
  ): Promise<string> {
    const { githubRepositories } = await this.readUser.getOne({ id: userId });

    const find = githubRepositories.find(
      ({ fullName }) => fullName === repository
    );

    if (!find) {
      throw new NotFoundException('Esse usuário não possui o repositório!');
    }

    return find.id;
  }

  async load(
    userId: string,
    repository: string
  ): Promise<GithubBranchRead.LoadOutput[]> {
    await this.checkRepositoryExists(userId, repository);

    const [owner, repo] = repository.split('/');

    const { githubInfos } = await this.readUser.getOne({ id: userId });

    const octokit = new Octokit({ auth: githubInfos.token });

    const get = async (): Promise<GithubBranchRead.Branches> => {
      let aux: GithubBranchRead.Branches = [];

      const request = async (page: number): Promise<void> => {
        const response = await octokit.request(
          'GET /repos/{owner}/{repo}/branches',
          {
            owner,
            repo,
            per_page: 100,
            page,
          }
        );

        aux = aux.concat(response.data);

        if (response.headers.link && response.headers.link.includes('last'))
          await request(page + 1);
      };

      await request(1);

      return aux;
    };

    const data = await get();

    return data.map(
      ({ name, commit }): GithubBranchRead.LoadOutput => ({
        name,
        sha: commit.sha,
      })
    );
  }
}
