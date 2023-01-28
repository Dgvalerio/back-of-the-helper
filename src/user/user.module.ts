import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserCreateModule } from '@/user/create/create.module';
import { UserResolver } from '@/user/user.resolver';
import { UserService } from '@/user/user.service';

@Module({
  imports: [UserCreateModule],
  providers: [PrismaService, UserService, UserResolver],
})
export class UserModule {}
