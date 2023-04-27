import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { AxiosRequestConfig } from 'axios';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Cookie } from 'tough-cookie';

export namespace TimesheetAppointmentCreate {
  export interface Service {
    configRequest(cookies: Cookie[]): AxiosRequestConfig;
    loadCookies(login: string, password: string): Promise<Cookie[]>;
    makeBody(WebKitFormBoundary: string, data: TimesheetAppointment): string;
    appointmentParse(
      data: Appointment
    ): Omit<TimesheetAppointment, '__RequestVerificationToken'>;
    create(userId: string, appointments: Appointment[]): Promise<Output[]>;
  }

  @InputType('TimesheetAppointment')
  export class Appointment {
    @IsNumberString()
    @IsNotEmpty({ message: 'Informe um cliente.' })
    client: string;

    @IsNumberString()
    @IsNotEmpty({ message: 'Informe um projeto.' })
    project: string;

    @IsNumberString()
    @IsNotEmpty({ message: 'Informe uma categoria.' })
    category: string;

    @IsString()
    @IsNotEmpty({ message: 'Informe uma data.' })
    // No formado dd/MM/yyyy
    date: string;

    @IsString()
    @IsMilitaryTime()
    @IsNotEmpty({ message: 'Informe a hora de início.' })
    // No formato hh:mm
    startTime: string;

    @IsString()
    @IsMilitaryTime()
    @IsNotEmpty({ message: 'Informe a hora de finalização.' })
    // No formato hh:mm
    endTime: string;

    @IsBoolean()
    @IsOptional()
    notMonetize?: boolean;

    @IsString()
    @IsOptional()
    commitLink?: string;

    @IsString()
    @IsNotEmpty({ message: 'Informe a descrição.' })
    description: string;
  }

  @InputType('TimesheetAppointmentCreateInput')
  export class Input {
    @IsArray()
    @ValidateNested()
    @Type(() => Appointment)
    appointments: Appointment[];
  }

  @ObjectType('TimesheetAppointmentCreateOutput')
  export class Output {
    @Field()
    client: string;

    @Field()
    project: string;

    @Field()
    category: string;

    @Field()
    date: string;

    @Field()
    startTime: string;

    @Field()
    endTime: string;

    @Field()
    notMonetize?: boolean;

    @Field()
    commitLink?: string;

    @Field()
    description: string;

    @Field()
    success: boolean;

    @Field()
    errorMessage?: string;
  }

  export interface TimesheetAppointment {
    __RequestVerificationToken: string;
    Id: string;
    IdCustomer: string;
    IdProject: string;
    IdCategory: string;
    // No formado dd/MM/yyyy
    InformedDate: string;
    // No formato hh:mm
    StartTime: string;
    // No formato hh:mm
    EndTime: string;
    NotMonetize: string;
    CommitRepository: string;
    Description: string;
  }
}
