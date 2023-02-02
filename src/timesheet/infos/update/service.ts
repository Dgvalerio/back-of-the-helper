import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { TimesheetInfosRead } from '@/timesheet/infos/read/types';
import { TimesheetInfosUpdate } from '@/timesheet/infos/update/types';
import { timesheetInfosAdapter } from '@/timesheet/infos/utils/adapter';

@Injectable()
export class TimesheetInfosUpdateService
  implements TimesheetInfosUpdate.Service
{
  constructor(private prisma: PrismaService) {}

  async update(
    userId: string,
    data: TimesheetInfosUpdate.Input
  ): Promise<TimesheetInfosRead.Output> {
    const timesheetInfos = await this.prisma.timesheetInfos.update({
      where: { userId },
      data,
    });

    return timesheetInfosAdapter(timesheetInfos);
  }
}
