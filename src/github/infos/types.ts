import { GithubInfosCreate } from '@/github/infos/create/types';
import { GithubInfosRead } from '@/github/infos/read/types';
import { GithubInfosUpdate } from '@/github/infos/update/types';
import { UserAuth } from '@/user/auth/types';

type GithubInfos = GithubInfosRead.Output;

export interface IGithubInfosResolver {
  createGithubInfos(
    context: UserAuth.Context,
    data: GithubInfosCreate.Input
  ): Promise<GithubInfos>;
  getAllGithubInfos(context: UserAuth.Context): Promise<GithubInfos[]>;
  getOneGithubInfos(context: UserAuth.Context): Promise<GithubInfos>;
  updateGithubInfos(
    context: UserAuth.Context,
    data: GithubInfosUpdate.Input
  ): Promise<GithubInfos>;
  deleteGithubInfos(context: UserAuth.Context): Promise<boolean>;
}
