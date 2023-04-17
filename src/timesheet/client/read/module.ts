import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { TimesheetClientReadService } from '@/timesheet/client/read/service';
import { TimesheetInfosReadModule } from '@/timesheet/infos/read/module';

@Module({
  imports: [HttpModule, TimesheetInfosReadModule],
  providers: [TimesheetClientReadService],
  exports: [TimesheetClientReadService],
})
export class TimesheetClientReadModule {}
