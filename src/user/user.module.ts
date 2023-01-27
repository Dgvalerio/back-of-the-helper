import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserResolver } from '@/user/user.resolver';
import { UserService } from '@/user/user.service';

@Module({
  providers: [PrismaService, UserService, UserResolver],
})
export class UserModule {}
