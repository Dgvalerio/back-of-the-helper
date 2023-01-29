import { InputType } from '@nestjs/graphql';

import { UserRead } from '@/user/read/types';

import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export namespace UserUpdate {
  export interface Service {
    update(id: UserRead.Output['id'], data: Input): Promise<UserRead.Output>;
    verifyConflict(email: UserRead.Output['email']): Promise<boolean>;
  }

  @InputType('UserUpdateInput')
  export class Input {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(8)
    @IsOptional()
    password?: string;
  }
}
