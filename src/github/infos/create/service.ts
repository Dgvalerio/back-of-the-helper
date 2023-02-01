import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { GithubInfosCreate } from '@/github/infos/create/types';
import { GithubInfosRead } from '@/github/infos/read/types';
import { githubInfosAdapter } from '@/github/infos/utils/adapter';
import { PrismaService } from '@/prisma.service';
import { UserReadService } from '@/user/read/service';

import { Octokit } from 'octokit';

@Injectable()
export class GithubInfosCreateService implements GithubInfosCreate.Service {
  constructor(
    private prisma: PrismaService,
    private userRead: UserReadService
  ) {}

  async verifyAlreadyCreated(id: string): Promise<void> {
    const exists = await this.userRead.getOne({ id });

    if (exists.githubInfos)
      throw new ConflictException('Esse usuário já tem um token!');
  }

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

  async create(
    userId: string,
    data: GithubInfosCreate.Input
  ): Promise<GithubInfosRead.Output> {
    await this.verifyAlreadyCreated(userId);

    await this.verifyTokenIsValid(data.token);

    const user = await this.prisma.githubInfos.create({
      data: { userId, token: data.token },
    });

    return githubInfosAdapter(user);
  }
}
