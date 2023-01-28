import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserCreateModule } from '@/user/create/module';
import { UserDeleteModule } from '@/user/delete/module';
import { UserResolver } from '@/user/user.resolver';
import { UserService } from '@/user/user.service';

@Module({
  imports: [UserCreateModule, UserDeleteModule],
  providers: [PrismaService, UserService, UserResolver],
})
export class UserModule {}
