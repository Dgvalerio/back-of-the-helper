import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserCreateService } from '@/user/create/service';
import { UserCreate } from '@/user/create/types';
import { UserDeleteService } from '@/user/delete/service';
import { UserGetInput } from '@/user/dto/user.get.input';
import { UserOutput } from '@/user/dto/user.get.output';
import { UserUpdateService } from '@/user/update/service';
import { UserUpdate } from '@/user/update/types';
import { UserService } from '@/user/user.service';
import { IUserResolver } from '@/user/user.types';

@Resolver()
export class UserResolver implements IUserResolver {
  constructor(
    private userService: UserService,
    private createService: UserCreateService,
    private updateService: UserUpdateService,
    private deleteService: UserDeleteService
  ) {}

  @Mutation(() => UserOutput)
  async create(@Args('data') data: UserCreate.Input): Promise<UserOutput> {
    return await this.createService.create(data);
  }

  @Query(() => UserOutput)
  async getOne(@Args('data') data: UserGetInput): Promise<UserOutput> {
    return await this.userService.getOne(data);
  }

  @Query(() => [UserOutput])
  async getAll(): Promise<UserOutput[]> {
    return await this.userService.getAll();
  }

  @Mutation(() => UserOutput)
  async update(@Args('data') data: UserUpdate.Input): Promise<UserOutput> {
    return await this.updateService.update(data);
  }

  @Mutation(() => Boolean)
  async delete(@Args('data') data: UserGetInput): Promise<boolean> {
    return await this.deleteService.delete(data);
  }
}
