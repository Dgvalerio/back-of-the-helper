import { BadRequestException, Injectable } from '@nestjs/common';

import { GithubBranchRead } from '@/github/branch/read/types';
import { GithubBranchSet } from '@/github/branch/set/types';
import { githubBranchAdapter } from '@/github/branch/utils/adapter';
import { GithubRepositoryReadService } from '@/github/repository/read/service';
import { PrismaService } from '@/prisma.service';
import { UserReadService } from '@/user/read/service';
import { GithubBranch } from '@prisma/client';

import { Octokit } from 'octokit';

@Injectable()
export class GithubBranchSetService implements GithubBranchSet.Service {
  constructor(
    private prisma: PrismaService,
    private userRead: UserReadService,
    private repositoryRead: GithubRepositoryReadService
  ) {}

  async verifyBranchIsValid(
    userId: string,
    repository: string,
    branch: string
  ): Promise<string> {
    try {
      const { githubInfos } = await this.userRead.getOne({ id: userId });

      const octokit = new Octokit({ auth: githubInfos.token });

      const [owner, repo] = repository.split('/');

      const response = await octokit.request(
        'GET /repos/{owner}/{repo}/branches/{branch}',
        { owner, repo, branch }
      );

      return response.data.commit.sha;
    } catch (e) {
      throw new BadRequestException('A branch informada é inválida');
    }
  }

  async set(
    userId: string,
    data: GithubBranchSet.Input
  ): Promise<GithubBranchRead.Output> {
    const sha = await this.verifyBranchIsValid(
      userId,
      data.repository,
      data.branch
    );

    const repository = await this.repositoryRead.getOne(userId, {
      fullName: data.repository,
    });

    let branch: GithubBranch;
    const repositoryId = repository.id;

    if (repository.branch) {
      branch = await this.prisma.githubBranch.update({
        where: { repositoryId },
        data: { name: data.branch, sha },
      });
    } else {
      branch = await this.prisma.githubBranch.create({
        data: { name: data.branch, sha, repositoryId },
      });
    }

    return githubBranchAdapter(branch);
  }
}
