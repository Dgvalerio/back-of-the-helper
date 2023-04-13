import { InputType } from '@nestjs/graphql';

import { UserRead } from '@/user/read/types';

import { IsNotEmpty, IsString } from 'class-validator';

export namespace GithubRepositoryDelete {
  export interface Service {
    checkRepositoryExists(
      userId: UserRead.Output['id'],
      repository: Input['fullName']
    ): Promise<string>;
    delete(userId: UserRead.Output['id'], data: Input): Promise<boolean>;
  }

  @InputType('GithubRepositoryDeleteInput')
  export class Input {
    @IsString()
    @IsNotEmpty({ message: 'Informe o nome do repositório.' })
    fullName: string;
  }
}
