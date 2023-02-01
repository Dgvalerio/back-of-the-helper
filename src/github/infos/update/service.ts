import { BadRequestException, Injectable } from '@nestjs/common';

import { GithubInfosCreate } from '@/github/infos/create/types';
import { GithubInfosRead } from '@/github/infos/read/types';
import { GithubInfosUpdate } from '@/github/infos/update/types';
import { githubInfosAdapter } from '@/github/infos/utils/adapter';
import { PrismaService } from '@/prisma.service';

import { Octokit } from 'octokit';

@Injectable()
export class GithubInfosUpdateService implements GithubInfosUpdate.Service {
  constructor(private prisma: PrismaService) {}

  async verifyTokenIsValid(
    token: GithubInfosCreate.Input['token']
  ): Promise<void> {
    try {
      const octokit = new Octokit({ auth: token });

      await octokit.request('GET /user');
    } catch (e) {
      throw new BadRequestException('O token informado é inválido');
    }
  }

  async update(
    userId: string,
    data: GithubInfosUpdate.Input
  ): Promise<GithubInfosRead.Output> {
    const githubInfos = await this.prisma.githubInfos.update({
      where: { userId },
      data,
    });

    return githubInfosAdapter(githubInfos);
  }
}
