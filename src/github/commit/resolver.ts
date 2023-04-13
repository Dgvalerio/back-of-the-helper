import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';

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
    @Context() context: UserAuth.Context,
    @Args('options') options: GithubCommitRead.Input
  ): Promise<GithubCommitRead.LoadOutput[]> {
    const { id, email, githubInfos } = context.req.user;

    return await this.readService.simpleLoad(
      id,
      email,
      githubInfos.token,
      options
    );
  }

  @UseGuards(UserAuthGuard)
  @Query(() => [GithubCommitRead.GithubCommitDayTimeGroup])
  async loadAndGroupGithubCommits(
    @Context() context: UserAuth.Context,
    @Args('options') options: GithubCommitRead.Input
  ): Promise<GithubCommitRead.GithubCommitDayTimeGroup[]> {
    const { id, email, githubInfos } = context.req.user;

    return await this.readService.groupedLoad(
      id,
      email,
      githubInfos.token,
      options
    );
  }
}
