import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { TimesheetInfosRead } from '@/timesheet/infos/read/types';
import { timesheetInfosAdapter } from '@/timesheet/infos/utils/adapter';

@Injectable()
export class TimesheetInfosReadService implements TimesheetInfosRead.Service {
  constructor(private prisma: PrismaService) {}

  async getAll(
    where: TimesheetInfosRead.Input
  ): Promise<TimesheetInfosRead.Output[]> {
    const infos = await this.prisma.timesheetInfos.findMany({ where });

    return infos.map(timesheetInfosAdapter);
  }

  async getOne(
    where: TimesheetInfosRead.Input
  ): Promise<TimesheetInfosRead.Output> {
    if (Object.keys(where).length === 0) {
      throw new BadRequestException('Nenhum parâmetro foi informado');
    }

    const timesheetInfos = await this.prisma.timesheetInfos.findUnique({
      where: where.id ? { id: where.id } : { userId: where.userId },
    });

    if (!timesheetInfos) {
      throw new NotFoundException(
        'Nenhuma informação do timesheet foi encontrada'
      );
    }

    return timesheetInfosAdapter(timesheetInfos);
  }
}
