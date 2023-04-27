import { Module } from '@nestjs/common';

import { TimesheetClientReadModule } from '@/timesheet/client/read/module';
import { TimesheetClientResolver } from '@/timesheet/client/resolver';

@Module({
  imports: [TimesheetClientReadModule],
  providers: [TimesheetClientResolver],
})
export class TimesheetClientModule {}
