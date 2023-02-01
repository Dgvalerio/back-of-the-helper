import { GithubInfosRead } from '@/github/infos/read/types';
import { GithubInfos } from '@prisma/client';

export const githubInfosAdapter = (
  infos: GithubInfos
): GithubInfosRead.Output => ({
  id: infos.id,
  token: infos.token,
  userId: infos.userId,
});
