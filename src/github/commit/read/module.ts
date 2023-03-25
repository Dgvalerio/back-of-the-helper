import { Module } from '@nestjs/common';

import { GithubCommitReadService } from '@/github/commit/read/service';
import { GithubRepositoryReadModule } from '@/github/repository/read/module';
import { PrismaService } from '@/prisma.service';

@Module({
  imports: [GithubRepositoryReadModule],
  providers: [PrismaService, GithubCommitReadService],
  exports: [GithubCommitReadService],
})
export class GithubCommitReadModule {}
