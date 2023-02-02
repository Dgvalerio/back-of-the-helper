import { InputType } from '@nestjs/graphql';

import { TimesheetInfosRead } from '@/timesheet/infos/read/types';
import { User } from '@prisma/client';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export namespace TimesheetInfosCreate {
  export interface Service {
    create(userId: User['id'], data: Input): Promise<TimesheetInfosRead.Output>;
    // verifyLoginIsValid(input: Input): Promise<void>; TODO: Implementar quando adicionar o puppeteer
    verifyAlreadyCreated(userId: User['id']): Promise<void>;
  }

  @InputType('TimesheetInfosCreateInput')
  export class Input {
    @IsEmail(undefined, { message: 'Um e-mail válido deve ser informado.' })
    @IsNotEmpty({ message: 'Informe seu e-mail.' })
    login: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty({ message: 'Informe sua senha.' })
    password: string;
  }
}
