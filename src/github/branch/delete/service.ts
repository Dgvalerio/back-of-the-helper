import { Injectable, NotFoundException } from '@nestjs/common';

import { GithubBranchDelete } from '@/github/branch/delete/types';
import { PrismaService } from '@/prisma.service';
import { UserReadService } from '@/user/read/service';

@Injectable()
export class GithubBranchDeleteService implements GithubBranchDelete.Service {
  constructor(
    private prisma: PrismaService,
    private userReadService: UserReadService
  ) {}

  async checkRepositoryHaveBranch(
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

    if (!find.branch) {
      throw new NotFoundException('Esse repositório não possui uma branch!');
    }

    return find.branch.id;
  }

  async delete(
    userId: string,
    data: GithubBranchDelete.Input
  ): Promise<boolean> {
    const id = await this.checkRepositoryHaveBranch(userId, data.repository);

    const res = await this.prisma.githubBranch.delete({ where: { id } });

    return !!res;
  }
}
