import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserCreateService } from '@/user/create/service';
import { UserReadModule } from '@/user/read/module';

@Module({
  imports: [UserReadModule],
  providers: [PrismaService, UserCreateService],
  exports: [UserCreateService],
})
export class UserCreateModule {}
