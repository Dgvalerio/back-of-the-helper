import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '@/prisma.service';
import { UserAuthService } from '@/user/auth/service';
import { JwtStrategy } from '@/user/auth/strategy';
import { UserReadService } from '@/user/read/service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [PrismaService, UserAuthService, JwtStrategy, UserReadService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
