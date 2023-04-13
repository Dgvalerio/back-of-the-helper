import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { TimesheetInfos } from '@prisma/client';

import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export namespace TimesheetInfosRead {
  export interface Service {
    getAll(where: Input): Promise<Output[]>;
    getOne(data: Input): Promise<Output>;
  }

  @InputType('TimesheetInfosGetInput')
  export class Input {
    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    id?: string;

    @IsEmail()
    @IsOptional()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    login?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    userId?: string;
  }

  @ObjectType('TimesheetInfosOutput')
  export class Output implements TimesheetInfos {
    @Field()
    id: string;

    @Field()
    login: string;

    @Field()
    iv: string;

    @Field()
    content: string;

    @Field()
    userId: string;
  }
}
