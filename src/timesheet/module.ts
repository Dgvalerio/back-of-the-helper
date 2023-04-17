import { Module } from '@nestjs/common';

import { TimesheetClientModule } from '@/timesheet/client/module';
import { TimesheetInfosModule } from '@/timesheet/infos/module';

@Module({
  imports: [TimesheetInfosModule, TimesheetClientModule],
})
export class TimesheetModule {}
