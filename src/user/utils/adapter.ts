import { githubInfosAdapter } from '@/github/infos/utils/adapter';
import { githubRepositoryAdapter } from '@/github/repository/utils/adapter';
import { timesheetInfosAdapter } from '@/timesheet/infos/utils/adapter';
import { UserRead } from '@/user/read/types';
import {
  User,
  GithubInfos,
  TimesheetInfos,
  GithubRepository,
} from '@prisma/client';

export const userAdapter = (
  user: User & {
    GithubInfos: GithubInfos;
    TimesheetInfos: TimesheetInfos;
    GithubRepository: GithubRepository[];
  }
): UserRead.Output => ({
  id: user.id,
  email: user.email,
  name: user.name,
  password: user.password,
  resetPasswordToken: user.resetPasswordToken,
  githubInfos: user.GithubInfos
    ? githubInfosAdapter(user.GithubInfos)
    : undefined,
  timesheetInfos: user.TimesheetInfos
    ? timesheetInfosAdapter(user.TimesheetInfos)
    : undefined,
  githubRepositories: user.GithubRepository
    ? user.GithubRepository.map(githubRepositoryAdapter)
    : [],
});
