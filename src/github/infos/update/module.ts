import { Module } from '@nestjs/common';

import { GithubInfosUpdateService } from '@/github/infos/update/service';
import { PrismaService } from '@/prisma.service';

@Module({
  providers: [PrismaService, GithubInfosUpdateService],
  exports: [GithubInfosUpdateService],
})
export class GithubInfosUpdateModule {}
