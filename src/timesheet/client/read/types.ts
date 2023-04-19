import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { AxiosRequestConfig } from 'axios';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Cookie } from 'tough-cookie';

export namespace TimesheetClientRead {
  export interface Service {
    configRequest(cookies: Cookie[]): AxiosRequestConfig;
    loadCookies(login: string, password: string): Promise<Cookie[]>;
    loadCategories(
      projectId: Project['id'],
      cookies: Cookie[]
    ): Promise<Category[]>;
    loadProjects(clientId: Client['id'], cookies: Cookie[]): Promise<Project[]>;
    loadClients(cookies: Cookie[]): Promise<Client[]>;
    getAll(data: Input): Promise<Client[]>;
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
