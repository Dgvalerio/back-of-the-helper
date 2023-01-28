import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { User } from '@prisma/client';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export namespace UserRead {
  export interface Service {
    getAll(): Promise<UserRead.Output[]>;
    getOne(data: UserRead.Input): Promise<UserRead.Output>;
  }

  @InputType('UserGetInput')
  export class Input {
    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    id?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    email?: string;
  }

  @ObjectType('UserOutput')
  export class Output implements Omit<User, 'password'> {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;
  }
}
