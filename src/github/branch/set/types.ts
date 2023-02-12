import { InputType } from '@nestjs/graphql';

import { GithubBranchRead } from '@/github/branch/read/types';
import { User } from '@prisma/client';

import { IsNotEmpty, IsString } from 'class-validator';

export namespace GithubBranchSet {
  export interface Service {
    set(userId: User['id'], data: Input): Promise<GithubBranchRead.Output>;
    verifyBranchIsValid(
      userId: User['id'],
      repository: Input['repository'],
      branchSha: Input['branch']
    ): Promise<string>;
  }

  @InputType('GithubBranchSetInput')
  export class Input {
    @IsString()
    @IsNotEmpty({ message: 'Informe o nome do repositório.' })
    repository: string;

    @IsString()
    @IsNotEmpty({ message: 'Informe o nome da branch.' })
    branch: string;
  }
}
