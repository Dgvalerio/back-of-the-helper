import { UserRead } from '@/user/read/types';

export namespace UserDelete {
  export interface Service {
    checkExists(data: UserRead.Input): Promise<boolean>;
    delete(data: UserRead.Input): Promise<boolean>;
  }
}
