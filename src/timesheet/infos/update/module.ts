import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { TimesheetInfosUpdateService } from '@/timesheet/infos/update/service';

@Module({
  providers: [PrismaService, TimesheetInfosUpdateService],
  exports: [TimesheetInfosUpdateService],
})
export class TimesheetInfosUpdateModule {}
