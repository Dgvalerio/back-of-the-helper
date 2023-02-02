import { Module } from '@nestjs/common';

import { TimesheetInfosCreateModule } from '@/timesheet/infos/create/module';
import { TimesheetInfosDeleteModule } from '@/timesheet/infos/delete/module';
import { TimesheetInfosReadModule } from '@/timesheet/infos/read/module';
import { TimesheetInfosResolver } from '@/timesheet/infos/resolver';
import { TimesheetInfosUpdateModule } from '@/timesheet/infos/update/module';

@Module({
  imports: [
    TimesheetInfosCreateModule,
    TimesheetInfosReadModule,
    TimesheetInfosUpdateModule,
    TimesheetInfosDeleteModule,
  ],
  providers: [TimesheetInfosResolver],
})
export class TimesheetInfosModule {}
