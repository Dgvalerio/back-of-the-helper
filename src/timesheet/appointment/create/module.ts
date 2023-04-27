import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { TimesheetAppointmentCreateService } from '@/timesheet/appointment/create/service';
import { TimesheetInfosReadModule } from '@/timesheet/infos/read/module';

@Module({
  imports: [HttpModule, TimesheetInfosReadModule],
  providers: [TimesheetAppointmentCreateService],
  exports: [TimesheetAppointmentCreateService],
})
export class TimesheetAppointmentCreateModule {}
