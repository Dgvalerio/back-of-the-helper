import { Module } from '@nestjs/common';

import { GithubInfosDeleteService } from '@/github/infos/delete/service';
import { PrismaService } from '@/prisma.service';
import { UserReadModule } from '@/user/read/module';

@Module({
  imports: [UserReadModule],
  providers: [PrismaService, GithubInfosDeleteService],
  exports: [GithubInfosDeleteService],
})
export class GithubInfosDeleteModule {}
