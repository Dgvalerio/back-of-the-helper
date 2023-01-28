import { InputType } from '@nestjs/graphql';

import { UserOutput } from '@/user/dto/user.get.output';
import { User } from '@prisma/client';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export namespace UserCreate {
  export interface Service {
    create(data: Input): Promise<UserOutput>;
    verifyConflict(email: User['email']): Promise<boolean>;
    adapter(user: User): UserOutput;
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
