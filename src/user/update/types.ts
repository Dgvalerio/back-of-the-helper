import { InputType } from '@nestjs/graphql';

import { UserRead } from '@/user/read/types';

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

type User = UserRead.Output;

export namespace UserUpdate {
  export interface Service {
    update(id: User['id'], data: Input): Promise<User>;
    verifyConflict(email: User['email']): Promise<boolean>;
    comparePasswords(
      password: User['password'],
      passwordConfirmation: User['password']
    ): void;
  }

  @InputType('UserUpdateInput')
  export class Input {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: User['email'];

    @IsString()
    @MinLength(8)
    @IsOptional()
    @IsNotEmpty({ message: 'Informe sua nova senha.' })
    password?: User['password'];

    @IsString()
    @MinLength(8)
    @ValidateIf((o) => o.password)
    @IsNotEmpty({ message: 'Confirme sua nova senha.' })
    passwordConfirmation?: User['password'];
  }
}
