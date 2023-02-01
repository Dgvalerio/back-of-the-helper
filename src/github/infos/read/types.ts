import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { GithubInfos } from '@prisma/client';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export namespace GithubInfosRead {
  export interface Service {
    getAll(where: Input): Promise<Output[]>;
    getOne(data: Input): Promise<Output>;
  }

  @InputType('GithubInfosGetInput')
  export class Input {
    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    id?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    userId?: string;
  }

  @ObjectType('GithubInfosOutput')
  export class Output implements GithubInfos {
    @Field()
    id: string;

    @Field()
    token: string;

    @Field()
    userId: string;
  }
}
