import { Module } from '@nestjs/common';

import { TimesheetInfosModule } from '@/timesheet/infos/module';

@Module({
  imports: [TimesheetInfosModule],
})
export class TimesheetModule {}
