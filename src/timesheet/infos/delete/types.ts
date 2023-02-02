import { UserRead } from '@/user/read/types';

export namespace TimesheetInfosDelete {
  export interface Service {
    checkLoginExists(userId: UserRead.Output['id']): Promise<void>;
    delete(userId: UserRead.Output['id']): Promise<boolean>;
  }
}
