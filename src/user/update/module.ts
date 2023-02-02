import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserReadModule } from '@/user/read/module';
import { UserUpdateService } from '@/user/update/service';

@Module({
  imports: [UserReadModule],
  providers: [PrismaService, UserUpdateService],
  exports: [UserUpdateService],
})
export class UserUpdateModule {}
