import { TimesheetInfosCreate } from '@/timesheet/infos/create/types';
import { TimesheetInfosRead } from '@/timesheet/infos/read/types';
import { TimesheetInfosUpdate } from '@/timesheet/infos/update/types';
import { UserAuth } from '@/user/auth/types';

type TimesheetInfos = TimesheetInfosRead.Output;

export interface ITimesheetInfosResolver {
  createTimesheetInfos(
    context: UserAuth.Context,
    data: TimesheetInfosCreate.Input
  ): Promise<TimesheetInfos>;
  getAllTimesheetInfos(context: UserAuth.Context): Promise<TimesheetInfos[]>;
  getOneTimesheetInfos(context: UserAuth.Context): Promise<TimesheetInfos>;
  updateTimesheetInfos(
    context: UserAuth.Context,
    data: TimesheetInfosUpdate.Input
  ): Promise<TimesheetInfos>;
  deleteTimesheetInfos(context: UserAuth.Context): Promise<boolean>;
}

export interface CryptoHash {
  iv: string;
  content: string;
}
