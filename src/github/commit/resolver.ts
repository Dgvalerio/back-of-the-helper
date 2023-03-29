import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';

import { GithubCommitReadService } from '@/github/commit/read/service';
import { GithubCommitRead } from '@/github/commit/read/types';
import { IGithubCommitResolver } from '@/github/commit/types';
import { UserAuthGuard } from '@/user/auth/guard';
import { UserAuth } from '@/user/auth/types';

@Resolver()
export class GithubCommitResolver implements IGithubCommitResolver {
  constructor(private readService: GithubCommitReadService) {}

  @UseGuards(UserAuthGuard)
  @Query(() => [GithubCommitRead.LoadOutput])
  async loadGithubCommits(
    @Context() context: UserAuth.Context
  ): Promise<GithubCommitRead.LoadOutput[]> {
    const { id, email, githubInfos } = context.req.user;

    return await this.readService.load(id, email, githubInfos.token);
  }

  @UseGuards(UserAuthGuard)
  @Query(() => [GithubCommitRead.LoadOutput])
  async loadAndTranslateGithubCommits(
    @Context() context: UserAuth.Context
  ): Promise<GithubCommitRead.LoadOutput[]> {
    const { id, email, githubInfos } = context.req.user;

    return await this.readService.loadAndTranslate(
      id,
      email,
      githubInfos.token
    );
  }

  @UseGuards(UserAuthGuard)
  @Query(() => [GithubCommitRead.GithubCommitDayGroup])
  async loadGithubCommitsGroupedByDay(
    @Context() context: UserAuth.Context
  ): Promise<GithubCommitRead.GithubCommitDayGroup[]> {
    const { id, email, githubInfos } = context.req.user;

    return await this.readService.loadGroupedByDay(
      id,
      email,
      githubInfos.token
    );
  }
}
