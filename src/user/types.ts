import { UserCreate } from '@/user/create/types';
import { UserRead } from '@/user/read/types';
import { UserUpdate } from '@/user/update/types';

export interface IUserResolver {
  create(data: UserCreate.Input): Promise<UserRead.Output>;
  getAll(): Promise<UserRead.Output[]>;
  getOne(data: UserRead.Input): Promise<UserRead.Output>;
  update(data: UserUpdate.Input): Promise<UserRead.Output>;
  delete(data: UserRead.Input): Promise<boolean>;
}
