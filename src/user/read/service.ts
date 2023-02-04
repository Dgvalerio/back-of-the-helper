import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserRead } from '@/user/read/types';
import { userAdapter } from '@/user/utils/adapter';

@Injectable()
export class UserReadService implements UserRead.Service {
  constructor(private prisma: PrismaService) {}

  async getAll(where: UserRead.Input): Promise<UserRead.Output[]> {
    const user = await this.prisma.user.findMany({
      where,
      include: { GithubInfos: true },
    });

    return user.map(userAdapter);
  }

  async getOne(where: UserRead.Input): Promise<UserRead.Output> {
    if (Object.keys(where).length === 0) {
      throw new BadRequestException('Nenhum parâmetro foi informado');
    }

    const user = await this.prisma.user.findUnique({
      where: where.id ? { id: where.id } : { email: where.email },
      include: {
        GithubInfos: true,
        TimesheetInfos: true,
        GithubRepository: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Nenhum usuário foi encontrado');
    }

    return userAdapter(user);
  }
}
