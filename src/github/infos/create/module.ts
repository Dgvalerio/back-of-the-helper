import { Module } from '@nestjs/common';

import { GithubInfosCreateService } from '@/github/infos/create/service';
import { PrismaService } from '@/prisma.service';
import { UserReadModule } from '@/user/read/module';

@Module({
  imports: [UserReadModule],
  providers: [PrismaService, GithubInfosCreateService],
  exports: [GithubInfosCreateService],
})
export class GithubInfosCreateModule {}
