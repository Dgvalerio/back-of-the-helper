import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { AxiosRequestConfig } from 'axios';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export namespace TimesheetClientRead {
  export interface Service {
    configRequest(cookies: TimesheetClientRead.Cookie[]): AxiosRequestConfig;

    loadCookies(login: string, password: string): Promise<Cookie[]>;

    loadCategories(
      projectId: Project['id'],
      cookies: Cookie[]
    ): Promise<Category[]>;
    loadProjects(clientId: Client['id'], cookies: Cookie[]): Promise<Project[]>;
    loadClients(cookies: Cookie[]): Promise<Client[]>;

    getAll(data: Input): Promise<Client[]>;
  }

  export interface Cookie {
    name: string;
    value: string;
    domain: string;
    path: string;
    expires: number;
    size: number;
    httpOnly: boolean;
    secure: boolean;
    session: boolean;
    sameSite?: unknown;
    priority: unknown;
    sameParty: boolean;
    sourceScheme: unknown;
    sourcePort: number;
    partitionKey?: string;
    partitionKeyOpaque?: boolean;
  }

  @ObjectType('TimesheetCategory')
  export class Category {
    @Field()
    id: number;

    @Field()
    name: string;
  }

  @ObjectType('TimesheetProject')
  export class Project {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    startDate: string;

    @Field()
    endDate: string;

    @Field()
    categories: Category[];
  }

  @ObjectType('TimesheetClient')
  export class Client {
    @Field()
    id: string;

    @Field()
    title: string;

    @Field()
    projects: Project[];
  }

  @InputType('TimesheetClientGetInput')
  export class Input {
    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio.' })
    userId: string;
  }
}
