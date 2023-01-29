import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserCreate } from '@/user/create/types';
import { EmailConflictError } from '@/user/errors/email-conflict.error';
import { UserRead } from '@/user/read/types';
import { userAdapter } from '@/user/utils/adapter';
import { hashPasswordTransform } from '@/user/utils/crypto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserCreateService implements UserCreate.Service {
  constructor(private prisma: PrismaService) {}

  async verifyEmailConflict(email: string): Promise<void> {
    const exists = await this.prisma.user.findFirst({ where: { email } });

    if (exists) throw new EmailConflictError();
  }

  comparePasswords(password: string, confirmation: string): void {
    if (password !== confirmation) {
      throw new BadRequestException(
        'A confirmação de senha deve ser igual à senha!'
      );
    }
  }

  async create(data: UserCreate.Input): Promise<UserRead.Output> {
    this.comparePasswords(data.password, data.passwordConfirmation);

    await this.verifyEmailConflict(data.email);

    const toSave: Prisma.UserCreateInput = {
      name: data.name,
      email: data.email,
      password: hashPasswordTransform.to(data.password),
    };

    const user = await this.prisma.user.create({ data: toSave });

    return userAdapter(user);
  }
}
