import { Module } from '@nestjs/common';

import { GithubInfosModule } from '@/github/infos/module';

@Module({
  imports: [GithubInfosModule],
})
export class GithubModule {}
