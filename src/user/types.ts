import { UserAuth } from '@/user/auth/types';
import { UserCreate } from '@/user/create/types';
import { UserRead } from '@/user/read/types';
import { UserUpdate } from '@/user/update/types';

export interface IUserResolver {
  create(data: UserCreate.Input): Promise<UserRead.Output>;
  getAll(): Promise<UserRead.Output[]>;
  getOne(data: UserRead.Input): Promise<UserRead.Output>;
  update(
    context: UserAuth.Context,
    data: UserUpdate.Input
  ): Promise<UserRead.Output>;
  delete(context: UserAuth.Context): Promise<boolean>;
}
