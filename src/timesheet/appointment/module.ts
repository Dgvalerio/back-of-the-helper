import { Module } from '@nestjs/common';

import { TimesheetAppointmentCreateModule } from '@/timesheet/appointment/create/module';
import { TimesheetAppointmentResolver } from '@/timesheet/appointment/resolver';

@Module({
  imports: [TimesheetAppointmentCreateModule],
  providers: [TimesheetAppointmentResolver],
})
export class TimesheetAppointmentModule {}
