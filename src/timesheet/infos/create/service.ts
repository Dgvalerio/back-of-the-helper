import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { TimesheetInfosCreate } from '@/timesheet/infos/create/types';
import { TimesheetInfosRead } from '@/timesheet/infos/read/types';
import { timesheetInfosAdapter } from '@/timesheet/infos/utils/adapter';
import { encryptAzurePassword } from '@/timesheet/infos/utils/encryptPassword';
import { UserReadService } from '@/user/read/service';

@Injectable()
export class TimesheetInfosCreateService
  implements TimesheetInfosCreate.Service
{
  constructor(
    private prisma: PrismaService,
    private userRead: UserReadService
  ) {}

  async verifyAlreadyCreated(id: string): Promise<void> {
    const exists = await this.userRead.getOne({ id });

    if (exists.timesheetInfos)
      throw new ConflictException('Esse usuário já tem um acesso azure!');
  }

  async create(
    userId: string,
    data: TimesheetInfosCreate.Input
  ): Promise<TimesheetInfosRead.Output> {
    await this.verifyAlreadyCreated(userId);

    const crypto = await encryptAzurePassword(data.password);

    const user = await this.prisma.timesheetInfos.create({
      data: {
        userId,
        login: data.login,
        iv: crypto.iv,
        content: crypto.content,
      },
    });

    return timesheetInfosAdapter(user);
  }
}
