import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserCreate } from '@/user/create/types';
import { EmailConflictError } from '@/user/errors/email-conflict.error';
import { UserRead } from '@/user/read/types';
import { User } from '@prisma/client';

@Injectable()
export class UserCreateService implements UserCreate.Service {
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

  async create(data: UserCreate.Input): Promise<UserRead.Output> {
    const conflict = await this.verifyConflict(data.email);

    if (conflict) throw new EmailConflictError();

    const user = await this.prisma.user.create({ data });

    return this.adapter(user);
  }
}
