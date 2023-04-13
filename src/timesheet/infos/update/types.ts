import { InputType } from '@nestjs/graphql';

import { TimesheetInfosRead } from '@/timesheet/infos/read/types';

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

type TimesheetInfos = TimesheetInfosRead.Output;

export namespace TimesheetInfosUpdate {
  export interface Service {
    update(
      userId: TimesheetInfos['userId'],
      data: Input
    ): Promise<TimesheetInfos>;
    // verifyLoginIsValid(input: Input): Promise<void>; TODO: Implementar quando adicionar o puppeteer
  }

  @InputType('TimesheetInfosUpdateInput')
  export class Input {
    @IsEmail(undefined, { message: 'Um e-mail válido deve ser informado.' })
    @IsNotEmpty({ message: 'Informe seu login.' })
    @IsOptional()
    login?: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty({ message: 'Informe sua senha.' })
    @IsOptional()
    password?: string;
  }
}
