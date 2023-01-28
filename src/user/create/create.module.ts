import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserCreateService } from '@/user/create/create.service';

@Module({
  providers: [PrismaService, UserCreateService],
  exports: [UserCreateService],
})
export class UserCreateModule {}
