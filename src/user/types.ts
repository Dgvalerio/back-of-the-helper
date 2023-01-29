import { UserAuth } from '@/user/auth/types';
import { UserCreate } from '@/user/create/types';
import { UserRead } from '@/user/read/types';
import { UserRecovery } from '@/user/recovery/types';
import { UserUpdate } from '@/user/update/types';

type User = UserRead.Output;

export interface IUserResolver {
  // AUTH
  login(data: UserAuth.Input): Promise<UserAuth.Output>;
  // CRUD
  create(data: UserCreate.Input): Promise<User>;
  getAll(context: UserAuth.Context): Promise<User[]>;
  getOne(context: UserAuth.Context): Promise<User>;
  update(context: UserAuth.Context, data: UserUpdate.Input): Promise<User>;
  delete(context: UserAuth.Context): Promise<boolean>;
  // RECOVERY
  sendResetPasswordEmail(data: UserRecovery.SendInput): Promise<boolean>;
  updatePassword(data: UserRecovery.UpdateInput): Promise<boolean>;
}
