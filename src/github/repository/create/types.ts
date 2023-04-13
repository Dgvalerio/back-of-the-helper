import { InputType } from '@nestjs/graphql';

import { GithubRepositoryRead } from '@/github/repository/read/types';
import { User } from '@prisma/client';

import { IsNotEmpty, IsString } from 'class-validator';

export namespace GithubRepositoryCreate {
  export interface Service {
    create(
      userId: User['id'],
      data: Input
    ): Promise<GithubRepositoryRead.Output>;
    verifyRepositoryIsValid(
      userId: User['id'],
      token: Input['fullName']
    ): Promise<void>;
    verifyRepositoryDuplicated(
      userId: User['id'],
      token: Input['fullName']
    ): Promise<void>;
  }

  @InputType('GithubRepositoryCreateInput')
  export class Input {
    @IsString()
    @IsNotEmpty({ message: 'Informe o nome do repositório.' })
    fullName: string;
  }
}
