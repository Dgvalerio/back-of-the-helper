import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { GithubRepositoryRead } from '@/github/repository/read/types';
import { githubRepositoryAdapter } from '@/github/repository/utils/adapter';
import { PrismaService } from '@/prisma.service';
import { UserReadService } from '@/user/read/service';

import { Octokit } from 'octokit';

@Injectable()
export class GithubRepositoryReadService
  implements GithubRepositoryRead.Service
{
  constructor(
    private prisma: PrismaService,
    private readUser: UserReadService
  ) {}

  async load(userId: string): Promise<GithubRepositoryRead.LoadOutput[]> {
    const { githubInfos } = await this.readUser.getOne({ id: userId });

    const octokit = new Octokit({ auth: githubInfos.token });

    const get = async (): Promise<GithubRepositoryRead.Repositories> => {
      let aux: GithubRepositoryRead.Repositories = [];

      const request = async (page: number): Promise<void> => {
        const response = await octokit.request('GET /user/repos', {
          per_page: 100,
          sort: 'pushed',
          page,
        });

        aux = aux.concat(response.data);

        if (response.headers.link && response.headers.link.includes('last'))
          await request(page + 1);
      };

      await request(1);

      return aux;
    };

    const data = await get();

    return data.map(
      ({ full_name, name, owner }): GithubRepositoryRead.LoadOutput => ({
        fullName: full_name,
        name,
        ownerLogin: owner.login,
        ownerAvatar: owner.avatar_url,
      })
    );
  }

  async getAll(userId: string): Promise<GithubRepositoryRead.Output[]> {
    const infos = await this.prisma.githubRepository.findMany({
      where: { userId },
      include: { GithubBranch: true },
    });

    return infos.map(githubRepositoryAdapter);
  }

  async getOne(
    userId: string,
    where: GithubRepositoryRead.Input
  ): Promise<GithubRepositoryRead.Output> {
    if (Object.keys(where).length === 0) {
      throw new BadRequestException('Nenhum parâmetro foi informado');
    }

    const githubRepository = await this.prisma.githubRepository.findFirst({
      where: { userId, fullName: where.fullName },
      include: { GithubBranch: true },
    });

    if (!githubRepository) {
      throw new NotFoundException('Nenhum informação foi encontrada');
    }

    return githubRepositoryAdapter(githubRepository);
  }
}
