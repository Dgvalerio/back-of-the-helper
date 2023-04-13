import { Module } from '@nestjs/common';

import { GithubInfosReadService } from '@/github/infos/read/service';
import { PrismaService } from '@/prisma.service';

@Module({
  providers: [PrismaService, GithubInfosReadService],
  exports: [GithubInfosReadService],
})
export class GithubInfosReadModule {}
