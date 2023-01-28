import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

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
    private createService: UserCreateService,
    private readService: UserReadService,
    private updateService: UserUpdateService,
    private deleteService: UserDeleteService
  ) {}

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

  @Mutation(() => Boolean)
  async delete(@Args('data') data: UserRead.Input): Promise<boolean> {
    return await this.deleteService.delete(data);
  }
}
