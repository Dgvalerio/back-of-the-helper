import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GithubInfosCreateService } from '@/github/infos/create/service';
import { GithubInfosCreate } from '@/github/infos/create/types';
import { GithubInfosDeleteService } from '@/github/infos/delete/service';
import { GithubInfosReadService } from '@/github/infos/read/service';
import { GithubInfosRead } from '@/github/infos/read/types';
import { IGithubInfosResolver } from '@/github/infos/types';
import { GithubInfosUpdateService } from '@/github/infos/update/service';
import { GithubInfosUpdate } from '@/github/infos/update/types';
import { UserAuthGuard } from '@/user/auth/guard';
import { UserAuth } from '@/user/auth/types';

@Resolver()
export class GithubInfosResolver implements IGithubInfosResolver {
  constructor(
    private createService: GithubInfosCreateService,
    private readService: GithubInfosReadService,
    private updateService: GithubInfosUpdateService,
    private deleteService: GithubInfosDeleteService
  ) {}

  @UseGuards(UserAuthGuard)
  @Mutation(() => GithubInfosRead.Output)
  async createGithubInfos(
    @Context() context: UserAuth.Context,
    @Args('data') data: GithubInfosCreate.Input
  ): Promise<GithubInfosRead.Output> {
    return await this.createService.create(context.req.user.id, data);
  }

  @UseGuards(UserAuthGuard)
  @Query(() => GithubInfosRead.Output)
  async getOneGithubInfos(
    @Context() context: UserAuth.Context
  ): Promise<GithubInfosRead.Output> {
    return await this.readService.getOne({ userId: context.req.user.id });
  }

  @UseGuards(UserAuthGuard)
  @Query(() => [GithubInfosRead.Output])
  async getAllGithubInfos(
    @Context() context: UserAuth.Context
  ): Promise<GithubInfosRead.Output[]> {
    return await this.readService.getAll({ userId: context.req.user.id });
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => GithubInfosRead.Output)
  async updateGithubInfos(
    @Context() context: UserAuth.Context,
    @Args('data') data: GithubInfosUpdate.Input
  ): Promise<GithubInfosRead.Output> {
    return await this.updateService.update(context.req.user.id, data);
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => Boolean)
  async deleteGithubInfos(
    @Context() context: UserAuth.Context
  ): Promise<boolean> {
    return await this.deleteService.delete(context.req.user.id);
  }
}
