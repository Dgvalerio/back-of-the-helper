import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GithubBranchDeleteService } from '@/github/branch/delete/service';
import { GithubBranchDelete } from '@/github/branch/delete/types';
import { GithubBranchReadService } from '@/github/branch/read/service';
import { GithubBranchRead } from '@/github/branch/read/types';
import { GithubBranchSetService } from '@/github/branch/set/service';
import { GithubBranchSet } from '@/github/branch/set/types';
import { IGithubBranchResolver } from '@/github/branch/types';
import { UserAuthGuard } from '@/user/auth/guard';
import { UserAuth } from '@/user/auth/types';

@Resolver()
export class GithubBranchResolver implements IGithubBranchResolver {
  constructor(
    private setService: GithubBranchSetService,
    private readService: GithubBranchReadService,
    private deleteService: GithubBranchDeleteService
  ) {}

  @UseGuards(UserAuthGuard)
  @Mutation(() => GithubBranchRead.Output)
  async setGithubBranch(
    @Context() context: UserAuth.Context,
    @Args('data') data: GithubBranchSet.Input
  ): Promise<GithubBranchRead.Output> {
    return await this.setService.set(context.req.user.id, data);
  }

  @UseGuards(UserAuthGuard)
  @Query(() => [GithubBranchRead.LoadOutput])
  async loadGithubBranches(
    @Context() context: UserAuth.Context,
    @Args('data') data: GithubBranchRead.LoadInput
  ): Promise<GithubBranchRead.LoadOutput[]> {
    return await this.readService.load(context.req.user.id, data);
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => Boolean)
  async deleteGithubBranch(
    @Context() context: UserAuth.Context,
    @Args('data') data: GithubBranchDelete.Input
  ): Promise<boolean> {
    return await this.deleteService.delete(context.req.user.id, data);
  }
}
