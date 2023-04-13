import { Module } from '@nestjs/common';

import { GithubBranchDeleteModule } from '@/github/branch/delete/module';
import { GithubBranchReadModule } from '@/github/branch/read/module';
import { GithubBranchResolver } from '@/github/branch/resolver';
import { GithubBranchSetModule } from '@/github/branch/set/module';

@Module({
  imports: [
    GithubBranchSetModule,
    GithubBranchReadModule,
    GithubBranchDeleteModule,
  ],
  providers: [GithubBranchResolver],
})
export class GithubBranchModule {}
