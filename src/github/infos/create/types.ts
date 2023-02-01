import { InputType } from '@nestjs/graphql';

import { GithubInfosRead } from '@/github/infos/read/types';
import { User } from '@prisma/client';

import { IsNotEmpty, IsString } from 'class-validator';

export namespace GithubInfosCreate {
  export interface Service {
    create(userId: User['id'], data: Input): Promise<GithubInfosRead.Output>;
    verifyTokenIsValid(token: Input['token']): Promise<void>;
    verifyAlreadyCreated(userId: User['id']): Promise<void>;
  }

  @InputType('GithubInfosCreateInput')
  export class Input {
    @IsString()
    @IsNotEmpty({ message: 'Informe seu token.' })
    token: string;
  }
}
