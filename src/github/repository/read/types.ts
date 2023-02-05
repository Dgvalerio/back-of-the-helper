import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { GithubBranchRead } from '@/github/branch/read/types';
import { Endpoints } from '@octokit/types';
import { GithubRepository, User } from '@prisma/client';

import { IsNotEmpty, IsString } from 'class-validator';

export namespace GithubRepositoryRead {
  export type Repositories = Endpoints['GET /user/repos']['response']['data'];

  export type Repository = Repositories[number];

  export interface Service {
    load(userId: User['id']): Promise<LoadOutput[]>;
    getAll(userId: User['id']): Promise<Output[]>;
    getOne(userId: User['id'], data: Input): Promise<Output>;
  }

  @InputType('GithubRepositoryGetInput')
  export class Input implements Pick<GithubRepository, 'fullName'> {
    @IsString()
    @IsNotEmpty({ message: 'Informe o nome do repositório.' })
    fullName: string;
  }

  @ObjectType('GithubRepositoryOutput')
  export class Output implements GithubRepository {
    @Field()
    id: string;

    @Field()
    fullName: string;

    @Field()
    userId: string;

    @Field()
    branch?: GithubBranchRead.Output;
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
