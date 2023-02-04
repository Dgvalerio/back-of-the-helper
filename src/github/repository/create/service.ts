import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { GithubRepositoryCreate } from '@/github/repository/create/types';
import { GithubRepositoryRead } from '@/github/repository/read/types';
import { githubRepositoryAdapter } from '@/github/repository/utils/adapter';
import { PrismaService } from '@/prisma.service';
import { UserReadService } from '@/user/read/service';

import { Octokit } from 'octokit';

@Injectable()
export class GithubRepositoryCreateService
  implements GithubRepositoryCreate.Service
{
  constructor(
    private prisma: PrismaService,
    private userRead: UserReadService
  ) {}

  async verifyRepositoryIsValid(
    userId: string,
    fullName: string
  ): Promise<void> {
    try {
      const { githubInfos } = await this.userRead.getOne({ id: userId });

      const octokit = new Octokit({ auth: githubInfos.token });

      const [owner, repo] = fullName.split('/');

      await octokit.request('GET /repos/{owner}/{repo}', { owner, repo });
    } catch (e) {
      throw new BadRequestException('O repositório informado é inválido');
    }
  }

  async verifyRepositoryDuplicated(
    userId: string,
    fullName: string
  ): Promise<void> {
    const { githubRepositories } = await this.userRead.getOne({
      id: userId,
    });

    const find = githubRepositories.find((repo) => repo.fullName === fullName);

    if (find) {
      throw new ConflictException('O repositório informado já foi cadastrado');
    }
  }

  async create(
    userId: string,
    data: GithubRepositoryCreate.Input
  ): Promise<GithubRepositoryRead.Output> {
    await this.verifyRepositoryDuplicated(userId, data.fullName);

    await this.verifyRepositoryIsValid(userId, data.fullName);

    const repository = await this.prisma.githubRepository.create({
      data: { userId, fullName: data.fullName },
    });

    return githubRepositoryAdapter(repository);
  }
}
