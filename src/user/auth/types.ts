import { ExecutionContext } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { UserRead } from '@/user/read/types';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export namespace UserAuth {
  export interface Service {
    validate(data: Input): Promise<Output>;
    jwtToken(user: UserRead.Output): Promise<string>;
  }

  export interface Strategy {
    validate(payload: { sub: UserRead.Output['id'] }): Promise<UserRead.Output>;
  }

  export interface Guard {
    getRequest(context: ExecutionContext): Request;
  }

  @InputType('UserAuthInput')
  export class Input {
    @IsEmail()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    email: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    password: string;
  }

  @ObjectType('UserAuthOutput')
  export class Output {
    @Field(() => UserRead.Output)
    user: UserRead.Output;

    @Field()
    token: string;
  }
}
