import { TimesheetInfosRead } from '@/timesheet/infos/read/types';
import { TimesheetInfos } from '@prisma/client';

export const timesheetInfosAdapter = (
  infos: TimesheetInfos
): TimesheetInfosRead.Output => ({
  id: infos.id,
  login: infos.login,
  password: infos.password,
  userId: infos.userId,
});
