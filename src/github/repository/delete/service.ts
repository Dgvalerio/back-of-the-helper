import { Injectable, NotFoundException } from '@nestjs/common';

import { GithubRepositoryDelete } from '@/github/repository/delete/types';
import { PrismaService } from '@/prisma.service';
import { UserReadService } from '@/user/read/service';

@Injectable()
export class GithubRepositoryDeleteService
  implements GithubRepositoryDelete.Service
{
  constructor(
    private prisma: PrismaService,
    private userReadService: UserReadService
  ) {}

  async checkRepositoryExists(
    userId: string,
    repository: string
  ): Promise<string> {
    const { githubRepositories } = await this.userReadService.getOne({
      id: userId,
    });

    const find = githubRepositories.find(
      ({ fullName }) => fullName === repository
    );

    if (!find) {
      throw new NotFoundException('Esse usuário não possui o repositório!');
    }

    return find.id;
  }

  async delete(
    userId: string,
    data: GithubRepositoryDelete.Input
  ): Promise<boolean> {
    const id = await this.checkRepositoryExists(userId, data.fullName);

    const res = await this.prisma.githubRepository.delete({ where: { id } });

    return !!res;
  }
}
