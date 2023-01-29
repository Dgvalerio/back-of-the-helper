import { InputType } from '@nestjs/graphql';

import { UserRead } from '@/user/read/types';
import { User } from '@prisma/client';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export namespace UserCreate {
  export interface Service {
    create(data: Input): Promise<UserRead.Output>;
    verifyEmailConflict(email: Input['email']): Promise<void>;
    comparePasswords(
      password: Input['password'],
      passwordConfirmation: Input['passwordConfirmation']
    ): void;
  }

  @InputType('UserCreateInput')
  export class Input {
    @IsString()
    @IsNotEmpty({ message: 'Informe seu nome.' })
    name: string;

    @IsEmail(undefined, { message: 'Um e-mail válido deve ser informado.' })
    @IsNotEmpty({ message: 'Informe seu e-mail.' })
    email: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty({ message: 'Informe sua senha.' })
    password: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty({ message: 'Confirme sua senha.' })
    passwordConfirmation: User['password'];
  }
}
