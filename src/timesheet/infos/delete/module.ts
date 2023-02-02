import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { TimesheetInfosDeleteService } from '@/timesheet/infos/delete/service';
import { UserReadModule } from '@/user/read/module';

@Module({
  imports: [UserReadModule],
  providers: [PrismaService, TimesheetInfosDeleteService],
  exports: [TimesheetInfosDeleteService],
})
export class TimesheetInfosDeleteModule {}
