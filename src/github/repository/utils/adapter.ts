import { githubBranchAdapter } from '@/github/branch/utils/adapter';
import { GithubRepositoryRead } from '@/github/repository/read/types';
import { GithubBranch, GithubRepository } from '@prisma/client';

export const githubRepositoryAdapter = (
  infos: GithubRepository & { GithubBranch: GithubBranch }
): GithubRepositoryRead.Output => ({
  id: infos.id,
  fullName: infos.fullName,
  userId: infos.userId,
  branch: infos.GithubBranch
    ? githubBranchAdapter(infos.GithubBranch)
    : undefined,
});
