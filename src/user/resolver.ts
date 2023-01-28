import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserAuthGuard } from '@/user/auth/guard';
import { UserAuthService } from '@/user/auth/service';
import { UserAuth } from '@/user/auth/types';
import { UserCreateService } from '@/user/create/service';
import { UserCreate } from '@/user/create/types';
import { UserDeleteService } from '@/user/delete/service';
import { UserReadService } from '@/user/read/service';
import { UserRead } from '@/user/read/types';
import { IUserResolver } from '@/user/types';
import { UserUpdateService } from '@/user/update/service';
import { UserUpdate } from '@/user/update/types';

@Resolver()
export class UserResolver implements IUserResolver {
  constructor(
    private authService: UserAuthService,
    private createService: UserCreateService,
    private readService: UserReadService,
    private updateService: UserUpdateService,
    private deleteService: UserDeleteService
  ) {}

  @Mutation(() => UserAuth.Output)
  public async login(
    @Args('data') data: UserAuth.Input
  ): Promise<UserAuth.Output> {
    const response = await this.authService.validate(data);

    return {
      user: response.user,
      token: response.token,
    };
  }

  @Mutation(() => UserRead.Output)
  async create(@Args('data') data: UserCreate.Input): Promise<UserRead.Output> {
    return await this.createService.create(data);
  }

  @Query(() => UserRead.Output)
  async getOne(@Args('data') data: UserRead.Input): Promise<UserRead.Output> {
    return await this.readService.getOne(data);
  }

  @Query(() => [UserRead.Output])
  async getAll(): Promise<UserRead.Output[]> {
    return await this.readService.getAll();
  }

  @Mutation(() => UserRead.Output)
  async update(@Args('data') data: UserUpdate.Input): Promise<UserRead.Output> {
    return await this.updateService.update(data);
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => Boolean)
  async delete(@Context() context: UserAuth.Context): Promise<boolean> {
    return await this.deleteService.delete(context.req.user.id);
  }
}
