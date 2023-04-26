import { Module } from '@nestjs/common';

import { TimesheetAppointmentModule } from '@/timesheet/appointment/module';
import { TimesheetClientModule } from '@/timesheet/client/module';
import { TimesheetInfosModule } from '@/timesheet/infos/module';

@Module({
  imports: [
    TimesheetAppointmentModule,
    TimesheetClientModule,
    TimesheetInfosModule,
  ],
})
export class TimesheetModule {}
