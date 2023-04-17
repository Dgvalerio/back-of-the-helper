import { TimesheetClientRead } from '@/timesheet/client/read/types';
import { UserAuth } from '@/user/auth/types';

type TimesheetClient = TimesheetClientRead.Client;

export interface ITimesheetClientResolver {
  getAllTimesheetClient(context: UserAuth.Context): Promise<TimesheetClient[]>;
}
