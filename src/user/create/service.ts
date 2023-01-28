import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserCreate } from '@/user/create/types';
import { EmailConflictError } from '@/user/errors/email-conflict.error';
import { UserRead } from '@/user/read/types';
import { userAdapter } from '@/user/utils/adapter';

@Injectable()
export class UserCreateService implements UserCreate.Service {
  constructor(private prisma: PrismaService) {}

  async verifyConflict(email: string): Promise<boolean> {
    const exists = await this.prisma.user.findFirst({ where: { email } });

    return !!exists;
  }

  async create(data: UserCreate.Input): Promise<UserRead.Output> {
    const conflict = await this.verifyConflict(data.email);

    if (conflict) throw new EmailConflictError();

    const user = await this.prisma.user.create({ data });

    return userAdapter(user);
  }
}
