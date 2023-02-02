import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { TimesheetInfosDelete } from '@/timesheet/infos/delete/types';
import { UserReadService } from '@/user/read/service';

@Injectable()
export class TimesheetInfosDeleteService
  implements TimesheetInfosDelete.Service
{
  constructor(
    private prisma: PrismaService,
    private userReadService: UserReadService
  ) {}

  async checkLoginExists(userId: string): Promise<void> {
    const exists = await this.userReadService.getOne({ id: userId });

    if (!exists) {
      throw new NotFoundException('Esse usuário não possui um acesso azure!');
    }
  }

  async delete(userId: string): Promise<boolean> {
    await this.checkLoginExists(userId);

    const res = await this.prisma.timesheetInfos.delete({ where: { userId } });

    return !!res;
  }
}
