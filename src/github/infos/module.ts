import { Module } from '@nestjs/common';

import { GithubInfosCreateModule } from '@/github/infos/create/module';
import { GithubInfosDeleteModule } from '@/github/infos/delete/module';
import { GithubInfosReadModule } from '@/github/infos/read/module';
import { GithubInfosResolver } from '@/github/infos/resolver';
import { GithubInfosUpdateModule } from '@/github/infos/update/module';

@Module({
  imports: [
    GithubInfosCreateModule,
    GithubInfosReadModule,
    GithubInfosUpdateModule,
    GithubInfosDeleteModule,
  ],
  providers: [GithubInfosResolver],
})
export class GithubInfosModule {}
