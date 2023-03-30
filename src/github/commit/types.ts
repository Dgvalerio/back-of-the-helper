import { GithubCommitRead } from '@/github/commit/read/types';
import { UserAuth } from '@/user/auth/types';

export interface IGithubCommitResolver {
  loadGithubCommits(
    context: UserAuth.Context,
    options: GithubCommitRead.Input
  ): Promise<GithubCommitRead.LoadOutput[]>;
  loadAndGroupGithubCommits(
    context: UserAuth.Context,
    options: GithubCommitRead.Input
  ): Promise<GithubCommitRead.GithubCommitDayGroup[]>;
}
