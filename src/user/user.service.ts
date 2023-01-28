import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserGetInput } from '@/user/dto/user.get.input';
import { UserOutput } from '@/user/dto/user.get.output';
import { IUserService } from '@/user/user.types';
import { User } from '@prisma/client';

@Injectable()
export class UserService implements IUserService {
  constructor(private prisma: PrismaService) {}

  adapter(user: User): UserOutput {
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

  async getAll(): Promise<UserOutput[]> {
    const user = await this.prisma.user.findMany();

    return user.map(this.adapter);
  }

  async getOne(where: UserGetInput): Promise<UserOutput> {
    const user = await this.prisma.user.findFirst({ where });

    return this.adapter(user);
  }
}
