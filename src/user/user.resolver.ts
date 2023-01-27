import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserCreateInput } from '@/user/dto/user.create.input';
import { UserGetInput } from '@/user/dto/user.get.input';
import { UserOutput } from '@/user/dto/user.get.output';
import { UserUpdateInput } from '@/user/dto/user.update.input';
import { UserService } from '@/user/user.service';
import { IUserResolver } from '@/user/user.types';

@Resolver()
export class UserResolver implements IUserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserOutput)
  async create(@Args('data') data: UserCreateInput): Promise<UserOutput> {
    return await this.userService.create(data);
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
  async update(@Args('data') data: UserUpdateInput): Promise<UserOutput> {
    return await this.userService.update(data);
  }

  @Mutation(() => Boolean)
  async delete(@Args('data') data: UserGetInput): Promise<boolean> {
    return await this.userService.delete(data);
  }
}
