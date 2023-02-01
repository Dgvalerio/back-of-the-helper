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
  createUser(data: UserCreate.Input): Promise<User>;
  getAllUsers(context: UserAuth.Context): Promise<User[]>;
  getOneUser(context: UserAuth.Context): Promise<User>;
  updateUser(context: UserAuth.Context, data: UserUpdate.Input): Promise<User>;
  deleteUser(context: UserAuth.Context): Promise<boolean>;
  // RECOVERY
  sendResetUserPasswordEmail(data: UserRecovery.SendInput): Promise<boolean>;
  updateUserPassword(data: UserRecovery.UpdateInput): Promise<boolean>;
}
