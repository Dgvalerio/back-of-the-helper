import { TimesheetInfosRead } from '@/timesheet/infos/read/types';
import { TimesheetInfos } from '@prisma/client';

export const timesheetInfosAdapter = (
  infos: TimesheetInfos
): TimesheetInfosRead.Output => ({
  id: infos.id,
  login: infos.login,
  iv: infos.iv,
  content: infos.content,
  userId: infos.userId,
});
