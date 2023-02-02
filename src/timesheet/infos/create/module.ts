import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { TimesheetInfosCreateService } from '@/timesheet/infos/create/service';
import { UserReadModule } from '@/user/read/module';

@Module({
  imports: [UserReadModule],
  providers: [PrismaService, TimesheetInfosCreateService],
  exports: [TimesheetInfosCreateService],
})
export class TimesheetInfosCreateModule {}
