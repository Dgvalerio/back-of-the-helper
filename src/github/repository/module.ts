import { Module } from '@nestjs/common';

import { GithubRepositoryCreateModule } from '@/github/repository/create/module';
import { GithubRepositoryDeleteModule } from '@/github/repository/delete/module';
import { GithubRepositoryReadModule } from '@/github/repository/read/module';
import { GithubRepositoryResolver } from '@/github/repository/resolver';

@Module({
  imports: [
    GithubRepositoryCreateModule,
    GithubRepositoryReadModule,
    GithubRepositoryDeleteModule,
  ],
  providers: [GithubRepositoryResolver],
})
export class GithubRepositoryModule {}
