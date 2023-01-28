import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserReadService } from '@/user/read/service';

@Module({
  providers: [PrismaService, UserReadService],
  exports: [UserReadService],
})
export class UserReadModule {}
