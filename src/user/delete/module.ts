import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserDeleteService } from '@/user/delete/service';

@Module({
  providers: [PrismaService, UserDeleteService],
  exports: [UserDeleteService],
})
export class UserDeleteModule {}
