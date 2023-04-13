import { Module } from '@nestjs/common';

import { GithubBranchModule } from '@/github/branch/module';
import { GithubCommitModule } from '@/github/commit/module';
import { GithubInfosModule } from '@/github/infos/module';
import { GithubRepositoryModule } from '@/github/repository/module';

@Module({
  imports: [
    GithubInfosModule,
    GithubRepositoryModule,
    GithubBranchModule,
    GithubCommitModule,
  ],
})
export class GithubModule {}
