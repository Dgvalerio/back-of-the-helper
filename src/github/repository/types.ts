import { GithubRepositoryCreate } from '@/github/repository/create/types';
import { GithubRepositoryDelete } from '@/github/repository/delete/types';
import { GithubRepositoryRead } from '@/github/repository/read/types';
import { UserAuth } from '@/user/auth/types';

type GithubRepository = GithubRepositoryRead.Output;

export interface IGithubRepositoryResolver {
  createGithubRepository(
    context: UserAuth.Context,
    data: GithubRepositoryCreate.Input
  ): Promise<GithubRepository>;
  loadGithubRepositories(
    context: UserAuth.Context
  ): Promise<GithubRepositoryRead.LoadOutput[]>;
  getAllGithubRepositories(
    context: UserAuth.Context
  ): Promise<GithubRepository[]>;
  getOneGithubRepository(context: UserAuth.Context): Promise<GithubRepository>;
  deleteGithubRepository(
    context: UserAuth.Context,
    data: GithubRepositoryDelete.Input
  ): Promise<boolean>;
}
