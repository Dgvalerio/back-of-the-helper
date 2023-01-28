import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserDelete } from '@/user/delete/types';
import { UserGetInput } from '@/user/dto/user.get.input';

@Injectable()
export class UserDeleteService implements UserDelete.Service {
  constructor(private prisma: PrismaService) {}

  async checkExists(where: UserGetInput): Promise<boolean> {
    const exists = await this.prisma.user.findFirst({ where });

    return !!exists;
  }

  async delete(where: UserGetInput): Promise<boolean> {
    const exists = await this.checkExists(where);

    if (!exists) {
      throw new NotFoundException('Esse usuário não foi encontrado');
    }

    const res = await this.prisma.user.delete({ where });

    return !!res;
  }
}
