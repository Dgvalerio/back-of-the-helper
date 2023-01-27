import { UserCreateInput } from '@/user/dto/user.create.input';
import { UserGetInput } from '@/user/dto/user.get.input';
import { UserOutput } from '@/user/dto/user.get.output';
import { UserUpdateInput } from '@/user/dto/user.update.input';
import { User } from '@prisma/client';

export interface IUserResolver {
  create(data: UserCreateInput): Promise<UserOutput>;
  getAll(): Promise<UserOutput[]>;
  getOne(data: UserGetInput): Promise<UserOutput>;
  update(data: UserUpdateInput): Promise<UserOutput>;
  delete(data: UserGetInput): Promise<boolean>;
}

export interface IUserService {
  create(data: UserCreateInput): Promise<UserOutput>;
  getAll(): Promise<UserOutput[]>;
  getOne(data: UserGetInput): Promise<UserOutput>;
  update(data: UserUpdateInput): Promise<UserOutput>;
  delete(data: UserGetInput): Promise<boolean>;
  verifyConflict(email: User['email']): Promise<boolean>;
  adapter(user: User): UserOutput;
}
