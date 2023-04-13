import { GithubBranchDelete } from '@/github/branch/delete/types';
import { GithubBranchRead } from '@/github/branch/read/types';
import { GithubBranchSet } from '@/github/branch/set/types';
import { UserAuth } from '@/user/auth/types';

type GithubBranch = GithubBranchRead.Output;

export interface IGithubBranchResolver {
  setGithubBranch(
    context: UserAuth.Context,
    data: GithubBranchSet.Input
  ): Promise<GithubBranch>;
  loadGithubBranches(
    context: UserAuth.Context,
    data: GithubBranchRead.LoadInput
  ): Promise<GithubBranchRead.LoadOutput[]>;
  deleteGithubBranch(
    context: UserAuth.Context,
    data: GithubBranchDelete.Input
  ): Promise<boolean>;
}
