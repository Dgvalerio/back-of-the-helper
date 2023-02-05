import { Module } from '@nestjs/common';

import { GithubInfosModule } from '@/github/infos/module';
import { GithubRepositoryModule } from '@/github/repository/module';

@Module({
  imports: [GithubInfosModule, GithubRepositoryModule],
})
export class GithubModule {}
