import { GithubBranchRead } from '@/github/branch/read/types';
import { GithubBranch } from '@prisma/client';

export const githubBranchAdapter = (
  infos: GithubBranch
): GithubBranchRead.Output => ({
  id: infos.id,
  name: infos.name,
  sha: infos.sha,
  repositoryId: infos.repositoryId,
});
