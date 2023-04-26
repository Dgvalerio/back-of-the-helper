import { TimesheetAppointmentCreate } from '@/timesheet/appointment/create/types';
import { UserAuth } from '@/user/auth/types';

export interface ITimesheetAppointmentResolver {
  createTimesheetAppointments(
    context: UserAuth.Context,
    data: TimesheetAppointmentCreate.Input
  ): Promise<TimesheetAppointmentCreate.Output[]>;
}
