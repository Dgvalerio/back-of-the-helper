import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { GithubInfosRead } from '@/github/infos/read/types';
import { githubInfosAdapter } from '@/github/infos/utils/adapter';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class GithubInfosReadService implements GithubInfosRead.Service {
  constructor(private prisma: PrismaService) {}

  async getAll(
    where: GithubInfosRead.Input
  ): Promise<GithubInfosRead.Output[]> {
    const infos = await this.prisma.githubInfos.findMany({ where });

    return infos.map(githubInfosAdapter);
  }

  async getOne(where: GithubInfosRead.Input): Promise<GithubInfosRead.Output> {
    if (Object.keys(where).length === 0) {
      throw new BadRequestException('Nenhum parâmetro foi informado');
    }

    const githubInfos = await this.prisma.githubInfos.findUnique({
      where: where.id ? { id: where.id } : { userId: where.userId },
    });

    if (!githubInfos) {
      throw new NotFoundException('Nenhum informação foi encontrada');
    }

    return githubInfosAdapter(githubInfos);
  }
}
