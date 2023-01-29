import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserRecoveryService } from '@/user/recovery/service';

@Module({
  providers: [PrismaService, UserRecoveryService],
  exports: [UserRecoveryService],
})
export class UserRecoveryModule {}
