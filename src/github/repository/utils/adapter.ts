import { GithubRepositoryRead } from '@/github/repository/read/types';
import { GithubRepository } from '@prisma/client';

export const githubRepositoryAdapter = (
  infos: GithubRepository
): GithubRepositoryRead.Output => ({
  id: infos.id,
  fullName: infos.fullName,
  userId: infos.userId,
});
