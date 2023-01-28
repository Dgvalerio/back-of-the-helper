import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserDelete } from '@/user/delete/types';
import { UserRead } from '@/user/read/types';

@Injectable()
export class UserDeleteService implements UserDelete.Service {
  constructor(private prisma: PrismaService) {}

  async checkExists(where: UserRead.Input): Promise<boolean> {
    const exists = await this.prisma.user.findFirst({ where });

    return !!exists;
  }

  async delete(where: UserRead.Input): Promise<boolean> {
    const exists = await this.checkExists(where);

    if (!exists) {
      throw new NotFoundException('Esse usuário não foi encontrado');
    }

    const res = await this.prisma.user.delete({ where });

    return !!res;
  }
}
