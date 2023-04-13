import { InputType } from '@nestjs/graphql';

import { UserRead } from '@/user/read/types';

import { IsNotEmpty, IsString } from 'class-validator';

export namespace GithubBranchDelete {
  export interface Service {
    checkRepositoryHaveBranch(
      userId: UserRead.Output['id'],
      repository: Input['repository']
    ): Promise<string>;
    delete(userId: UserRead.Output['id'], data: Input): Promise<boolean>;
  }

  @InputType('GithubBranchDeleteInput')
  export class Input {
    @IsString()
    @IsNotEmpty({ message: 'Informe o nome do repositório.' })
    repository: string;
  }
}
