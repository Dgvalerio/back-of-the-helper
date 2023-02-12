import { Module } from '@nestjs/common';

import { GithubBranchSetService } from '@/github/branch/set/service';
import { GithubRepositoryReadModule } from '@/github/repository/read/module';
import { PrismaService } from '@/prisma.service';
import { UserReadModule } from '@/user/read/module';

@Module({
  imports: [UserReadModule, GithubRepositoryReadModule],
  providers: [PrismaService, GithubBranchSetService],
  exports: [GithubBranchSetService],
})
export class GithubBranchSetModule {}
