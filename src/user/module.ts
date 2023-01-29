import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserAuthModule } from '@/user/auth/module';
import { UserCreateModule } from '@/user/create/module';
import { UserDeleteModule } from '@/user/delete/module';
import { UserReadModule } from '@/user/read/module';
import { UserRecoveryModule } from '@/user/recovery/module';
import { UserResolver } from '@/user/resolver';
import { UserUpdateModule } from '@/user/update/module';

@Module({
  imports: [
    UserAuthModule,
    UserCreateModule,
    UserReadModule,
    UserRecoveryModule,
    UserUpdateModule,
    UserDeleteModule,
  ],
  providers: [PrismaService, UserResolver],
})
export class UserModule {}
