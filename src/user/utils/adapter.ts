import { githubInfosAdapter } from '@/github/infos/utils/adapter';
import { timesheetInfosAdapter } from '@/timesheet/infos/utils/adapter';
import { UserRead } from '@/user/read/types';
import { User, GithubInfos, TimesheetInfos } from '@prisma/client';

export const userAdapter = (
  user: User & { GithubInfos: GithubInfos; TimesheetInfos: TimesheetInfos }
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
});
