import { Module } from '@nestjs/common';

import { GithubCommitReadModule } from '@/github/commit/read/module';
import { GithubCommitResolver } from '@/github/commit/resolver';

@Module({
  imports: [GithubCommitReadModule],
  providers: [GithubCommitResolver],
})
export class GithubCommitModule {}
