import { UserRead } from '@/user/read/types';

export namespace GithubInfosDelete {
  export interface Service {
    checkTokenExists(userId: UserRead.Output['id']): Promise<void>;
    delete(userId: UserRead.Output['id']): Promise<boolean>;
  }
}
