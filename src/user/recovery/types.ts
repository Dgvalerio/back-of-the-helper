import { InputType } from '@nestjs/graphql';

import { UserRead } from '@/user/read/types';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

type User = UserRead.Output;

export namespace UserRecovery {
  export interface Service {
    verifyEmailExists(email: User['email']): Promise<void>;
    generateToken(): string;
    updateToken(email: User['email'], token: string): Promise<void>;
    sendToken(email: User['email']): Promise<boolean>;
    compareTokens(email: User['email'], token: string): Promise<void>;
    comparePasswords(
      password: User['password'],
      passwordConfirmation: User['password']
    ): void;
    updateUser(email: User['email'], password: string): Promise<void>;
    updatePassword(data: UpdateInput): Promise<boolean>;
  }

  @InputType('UserRecoveryUpdateInput')
  export class UpdateInput {
    @IsString()
    @IsNotEmpty({ message: 'Informe o token enviado ao seu e-mail.' })
    token: string;

    @IsEmail(undefined, { message: 'Um e-mail válido deve ser informado.' })
    @IsNotEmpty({ message: 'Informe seu e-mail.' })
    email: User['email'];

    @IsString()
    @MinLength(8)
    @IsNotEmpty({ message: 'Informe sua nova senha.' })
    password: User['password'];

    @IsString()
    @MinLength(8)
    @IsNotEmpty({ message: 'Confirme sua nova senha.' })
    passwordConfirmation: User['password'];
  }

  @InputType('UserRecoverySendInput')
  export class SendInput {
    @IsEmail(undefined, { message: 'Um e-mail válido deve ser informado.' })
    @IsNotEmpty({ message: 'Informe seu e-mail.' })
    email: User['email'];
  }
}
