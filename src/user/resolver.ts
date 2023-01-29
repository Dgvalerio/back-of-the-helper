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
import { UserRecoveryService } from '@/user/recovery/service';
import { UserRecovery } from '@/user/recovery/types';
import { IUserResolver } from '@/user/types';
import { UserUpdateService } from '@/user/update/service';
import { UserUpdate } from '@/user/update/types';

@Resolver()
export class UserResolver implements IUserResolver {
  constructor(
    private authService: UserAuthService,
    private recoveryService: UserRecoveryService,
    private createService: UserCreateService,
    private readService: UserReadService,
    private updateService: UserUpdateService,
    private deleteService: UserDeleteService
  ) {}

  @Mutation(() => UserAuth.Output)
  async login(@Args('data') data: UserAuth.Input): Promise<UserAuth.Output> {
    const response = await this.authService.validate(data);

    return {
      user: response.user,
      token: response.token,
    };
  }

  @Mutation(() => Boolean)
  async sendResetPasswordEmail(
    @Args('data') data: UserRecovery.SendInput
  ): Promise<boolean> {
    return await this.recoveryService.sendToken(data.email);
  }

  @Mutation(() => Boolean)
  async updatePassword(
    @Args('data') data: UserRecovery.UpdateInput
  ): Promise<boolean> {
    return await this.recoveryService.updatePassword(data);
  }

  @Mutation(() => UserRead.Output)
  async create(@Args('data') data: UserCreate.Input): Promise<UserRead.Output> {
    return await this.createService.create(data);
  }

  @UseGuards(UserAuthGuard)
  @Query(() => UserRead.Output)
  async getOne(@Context() context: UserAuth.Context): Promise<UserRead.Output> {
    return await this.readService.getOne({ id: context.req.user.id });
  }

  @UseGuards(UserAuthGuard)
  @Query(() => [UserRead.Output])
  async getAll(
    @Context() context: UserAuth.Context
  ): Promise<UserRead.Output[]> {
    return await this.readService.getAll({ id: context.req.user.id });
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => UserRead.Output)
  async update(
    @Context() context: UserAuth.Context,
    @Args('data') data: UserUpdate.Input
  ): Promise<UserRead.Output> {
    return await this.updateService.update(context.req.user.id, data);
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => Boolean)
  async delete(@Context() context: UserAuth.Context): Promise<boolean> {
    return await this.deleteService.delete(context.req.user.id);
  }
}
