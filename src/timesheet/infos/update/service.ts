import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { TimesheetInfosRead } from '@/timesheet/infos/read/types';
import { TimesheetInfosUpdate } from '@/timesheet/infos/update/types';
import { timesheetInfosAdapter } from '@/timesheet/infos/utils/adapter';
import { encryptAzurePassword } from '@/timesheet/infos/utils/encryptPassword';
import { Prisma } from '@prisma/client';

@Injectable()
export class TimesheetInfosUpdateService
  implements TimesheetInfosUpdate.Service
{
  constructor(private prisma: PrismaService) {}

  async update(
    userId: string,
    data: TimesheetInfosUpdate.Input
  ): Promise<TimesheetInfosRead.Output> {
    const toUpdate: Prisma.TimesheetInfosUpdateInput = {};

    if (data.login) {
      toUpdate.login = data.login;
    }

    if (data.password) {
      const { iv, content } = await encryptAzurePassword(data.password);

      toUpdate.iv = iv;
      toUpdate.content = content;
    }

    const timesheetInfos = await this.prisma.timesheetInfos.update({
      where: { userId },
      data: toUpdate,
    });

    return timesheetInfosAdapter(timesheetInfos);
  }
}
