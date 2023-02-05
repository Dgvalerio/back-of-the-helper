import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { GithubRepositoryRead } from '@/github/repository/read/types';
import { UserRead } from '@/user/read/types';
import { Endpoints } from '@octokit/types';
import { GithubBranch } from '@prisma/client';

import { IsNotEmpty, IsString } from 'class-validator';

import Repository = GithubRepositoryRead.Output;

export namespace GithubBranchRead {
  export type Branches =
    Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'];

  export interface Service {
    checkRepositoryExists(
      userId: UserRead.Output['id'],
      repository: Repository['fullName']
    ): Promise<string>;
    load(
      userId: UserRead.Output['id'],
      repository: Repository['fullName']
    ): Promise<LoadOutput[]>;
  }

  @InputType('GithubBranchGetInput')
  export class Input implements Pick<GithubBranch, 'name'> {
    @IsString()
    @IsNotEmpty({ message: 'Informe o nome da branch.' })
    name: string;
  }

  @ObjectType('GithubBranchOutput')
  export class Output implements GithubBranch {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    sha: string;

    @Field()
    repositoryId: string;
  }

  @ObjectType('GithubBranchLoadOutput')
  export class LoadOutput {
    @Field()
    name: string;

    @Field()
    sha: string;
  }
}
