import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { EmailConflictError } from '@/user/errors/email-conflict.error';
import { UserRead } from '@/user/read/types';
import { UserUpdate } from '@/user/update/types';
import { User } from '@prisma/client';

@Injectable()
export class UserUpdateService implements UserUpdate.Service {
  constructor(private prisma: PrismaService) {}

  adapter(user: User): UserRead.Output {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async verifyConflict(email: string): Promise<boolean> {
    const exists = await this.prisma.user.findFirst({ where: { email } });

    return !!exists;
  }

  async update({ id, ...data }: UserUpdate.Input): Promise<UserRead.Output> {
    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'Nenhum parâmetro foi informado para atualização'
      );
    }

    if (data.email) {
      const conflict = await this.verifyConflict(data.email);

      if (conflict) throw new EmailConflictError();
    }

    const user = await this.prisma.user.update({ where: { id }, data });

    return this.adapter(user);
  }
}
