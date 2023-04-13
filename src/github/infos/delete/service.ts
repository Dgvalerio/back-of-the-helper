import { Injectable, NotFoundException } from '@nestjs/common';

import { GithubInfosDelete } from '@/github/infos/delete/types';
import { PrismaService } from '@/prisma.service';
import { UserReadService } from '@/user/read/service';

@Injectable()
export class GithubInfosDeleteService implements GithubInfosDelete.Service {
  constructor(
    private prisma: PrismaService,
    private userReadService: UserReadService
  ) {}

  async checkTokenExists(userId: string): Promise<void> {
    const exists = await this.userReadService.getOne({ id: userId });

    if (!exists.githubInfos) {
      throw new NotFoundException('Esse usuário não possui um token!');
    }
  }

  async delete(userId: string): Promise<boolean> {
    await this.checkTokenExists(userId);

    const res = await this.prisma.githubInfos.delete({ where: { userId } });

    return !!res;
  }
}
