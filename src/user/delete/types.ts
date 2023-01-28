import { UserRead } from '@/user/read/types';

export namespace UserDelete {
  export interface Service {
    checkExists(id: UserRead.Output['id']): Promise<boolean>;
    delete(id: UserRead.Output['id']): Promise<boolean>;
  }
}
