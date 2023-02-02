import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { TimesheetInfosReadService } from '@/timesheet/infos/read/service';

@Module({
  providers: [PrismaService, TimesheetInfosReadService],
  exports: [TimesheetInfosReadService],
})
export class TimesheetInfosReadModule {}
