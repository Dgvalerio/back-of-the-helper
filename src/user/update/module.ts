import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserUpdateService } from '@/user/update/service';

@Module({
  providers: [PrismaService, UserUpdateService],
  exports: [UserUpdateService],
})
export class UserUpdateModule {}
