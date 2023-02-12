import { Module } from '@nestjs/common';

import { GithubBranchModule } from '@/github/branch/module';
import { GithubInfosModule } from '@/github/infos/module';
import { GithubRepositoryModule } from '@/github/repository/module';

@Module({
  imports: [GithubInfosModule, GithubRepositoryModule, GithubBranchModule],
})
export class GithubModule {}
