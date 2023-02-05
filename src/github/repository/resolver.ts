import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GithubRepositoryCreateService } from '@/github/repository/create/service';
import { GithubRepositoryCreate } from '@/github/repository/create/types';
import { GithubRepositoryDeleteService } from '@/github/repository/delete/service';
import { GithubRepositoryDelete } from '@/github/repository/delete/types';
import { GithubRepositoryReadService } from '@/github/repository/read/service';
import { GithubRepositoryRead } from '@/github/repository/read/types';
import { IGithubRepositoryResolver } from '@/github/repository/types';
import { UserAuthGuard } from '@/user/auth/guard';
import { UserAuth } from '@/user/auth/types';

@Resolver()
export class GithubRepositoryResolver implements IGithubRepositoryResolver {
  constructor(
    private createService: GithubRepositoryCreateService,
    private readService: GithubRepositoryReadService,
    private deleteService: GithubRepositoryDeleteService
  ) {}

  @UseGuards(UserAuthGuard)
  @Mutation(() => GithubRepositoryRead.Output)
  async createGithubRepository(
    @Context() context: UserAuth.Context,
    @Args('data') data: GithubRepositoryCreate.Input
  ): Promise<GithubRepositoryRead.Output> {
    return await this.createService.create(context.req.user.id, data);
  }

  @UseGuards(UserAuthGuard)
  @Query(() => [GithubRepositoryRead.LoadOutput])
  async loadGithubRepositories(
    @Context() context: UserAuth.Context
  ): Promise<GithubRepositoryRead.LoadOutput[]> {
    return await this.readService.load(context.req.user.id);
  }

  @UseGuards(UserAuthGuard)
  @Query(() => GithubRepositoryRead.Output)
  async getOneGithubRepository(
    @Context() context: UserAuth.Context
  ): Promise<GithubRepositoryRead.Output> {
    return await this.readService.getOne({ userId: context.req.user.id });
  }

  @UseGuards(UserAuthGuard)
  @Query(() => [GithubRepositoryRead.Output])
  async getAllGithubRepositories(
    @Context() context: UserAuth.Context
  ): Promise<GithubRepositoryRead.Output[]> {
    return await this.readService.getAll({ userId: context.req.user.id });
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => Boolean)
  async deleteGithubRepository(
    @Context() context: UserAuth.Context,
    @Args('data') data: GithubRepositoryDelete.Input
  ): Promise<boolean> {
    return await this.deleteService.delete(context.req.user.id, data);
  }
}
