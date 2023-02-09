import { Module } from '@nestjs/common';

import { GithubBranchCreateService } from '@/github/branch/create/service';
import { GithubRepositoryReadModule } from '@/github/repository/read/module';
import { PrismaService } from '@/prisma.service';
import { UserReadModule } from '@/user/read/module';

@Module({
  imports: [UserReadModule, GithubRepositoryReadModule],
  providers: [PrismaService, GithubBranchCreateService],
  exports: [GithubBranchCreateService],
})
export class GithubBranchCreateModule {}
