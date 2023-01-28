import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserDelete } from '@/user/delete/types';

@Injectable()
export class UserDeleteService implements UserDelete.Service {
  constructor(private prisma: PrismaService) {}

  async checkExists(id: string): Promise<boolean> {
    const exists = await this.prisma.user.findFirst({ where: { id } });

    return !!exists;
  }

  async delete(id: string): Promise<boolean> {
    const exists = await this.checkExists(id);

    if (!exists) {
      throw new NotFoundException('Esse usuário não foi encontrado');
    }

    const res = await this.prisma.user.delete({ where: { id } });

    return !!res;
  }
}
