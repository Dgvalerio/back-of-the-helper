import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { Endpoints } from '@octokit/types';
import { GithubRepository, User } from '@prisma/client';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export namespace GithubRepositoryRead {
  export type Repositories = Endpoints['GET /user/repos']['response']['data'];

  export type Repository = Repositories[number];

  export interface Service {
    load(userId: User['id']): Promise<LoadOutput[]>;
    getAll(where: Input): Promise<Output[]>;
    getOne(data: Input): Promise<Output>;
  }

  @InputType('GithubRepositoryGetInput')
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

  @ObjectType('GithubRepositoryOutput')
  export class Output implements GithubRepository {
    @Field()
    id: string;

    @Field()
    fullName: string;

    @Field()
    userId: string;
  }

  @ObjectType('GithubRepositoryLoadOutput')
  export class LoadOutput {
    @Field()
    fullName: string;

    @Field()
    name: string;

    @Field()
    ownerLogin: string;

    @Field()
    ownerAvatar: string;
  }
}
