import { InputType } from '@nestjs/graphql';

import { UserRead } from '@/user/read/types';
import { User } from '@prisma/client';

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export namespace UserUpdate {
  export interface Service {
    update(data: Input): Promise<UserRead.Output>;
    verifyConflict(email: User['email']): Promise<boolean>;
    adapter(user: User): UserRead.Output;
  }

  @InputType('UserUpdateInput')
  export class Input {
    @IsString()
    @IsNotEmpty()
    id: string;

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
