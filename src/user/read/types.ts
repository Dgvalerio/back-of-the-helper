import { Field, HideField, InputType, ObjectType } from '@nestjs/graphql';

import { GithubInfosRead } from '@/github/infos/read/types';
import { TimesheetInfosRead } from '@/timesheet/infos/read/types';
import { User } from '@prisma/client';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export namespace UserRead {
  export interface Service {
    getAll(where: Input): Promise<Output[]>;
    getOne(data: Input): Promise<Output>;
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
  export class Output implements User {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    @HideField()
    password: string;

    @Field()
    resetPasswordToken: string | null;

    @Field()
    githubInfos?: GithubInfosRead.Output;

    @Field()
    timesheetInfos?: TimesheetInfosRead.Output;
  }
}
