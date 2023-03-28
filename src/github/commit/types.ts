import { GithubCommitRead } from '@/github/commit/read/types';
import { UserAuth } from '@/user/auth/types';

export interface IGithubCommitResolver {
  loadGithubCommits(
    context: UserAuth.Context
  ): Promise<GithubCommitRead.LoadOutput[]>;
  loadGithubCommitsGroupedByDay(
    context: UserAuth.Context
  ): Promise<GithubCommitRead.GithubCommitDayGroup[]>;
  loadAndTranslateGithubCommits(
    context: UserAuth.Context
  ): Promise<GithubCommitRead.LoadOutput[]>;
}
