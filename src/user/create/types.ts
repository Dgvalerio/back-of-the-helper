import { InputType } from '@nestjs/graphql';

import { UserRead } from '@/user/read/types';
import { User } from '@prisma/client';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export namespace UserCreate {
  export interface Service {
    create(data: Input): Promise<UserRead.Output>;
    verifyConflict(email: User['email']): Promise<boolean>;
    adapter(user: User): UserRead.Output;
  }

  @InputType('UserCreateInput')
  export class Input {
    @IsString()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    name: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    email: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    password: string;
  }
}
