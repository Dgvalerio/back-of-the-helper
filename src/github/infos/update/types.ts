import { InputType } from '@nestjs/graphql';

import { GithubInfosRead } from '@/github/infos/read/types';

import { IsNotEmpty, IsString } from 'class-validator';

type GithubInfos = GithubInfosRead.Output;

export namespace GithubInfosUpdate {
  export interface Service {
    update(userId: GithubInfos['userId'], data: Input): Promise<GithubInfos>;
    verifyTokenIsValid(token: Input['token']): Promise<void>;
  }

  @InputType('GithubInfosUpdateInput')
  export class Input {
    @IsString()
    @IsNotEmpty({ message: 'Informe seu token.' })
    token: string;
  }
}
