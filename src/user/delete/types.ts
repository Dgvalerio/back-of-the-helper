import { UserGetInput } from '@/user/dto/user.get.input';

export namespace UserDelete {
  export interface Service {
    checkExists(data: UserGetInput): Promise<boolean>;
    delete(data: UserGetInput): Promise<boolean>;
  }
}
