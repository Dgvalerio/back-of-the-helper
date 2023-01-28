import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserCreateModule } from '@/user/create/module';
import { UserDeleteModule } from '@/user/delete/module';
import { UserReadModule } from '@/user/read/module';
import { UserUpdateModule } from '@/user/update/module';
import { UserResolver } from '@/user/user.resolver';

@Module({
  imports: [
    UserCreateModule,
    UserReadModule,
    UserUpdateModule,
    UserDeleteModule,
  ],
  providers: [PrismaService, UserResolver],
})
export class UserModule {}
