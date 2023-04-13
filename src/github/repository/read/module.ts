import { Module } from '@nestjs/common';

import { GithubRepositoryReadService } from '@/github/repository/read/service';
import { PrismaService } from '@/prisma.service';
import { UserReadModule } from '@/user/read/module';

@Module({
  imports: [UserReadModule],
  providers: [PrismaService, GithubRepositoryReadService],
  exports: [GithubRepositoryReadService],
})
export class GithubRepositoryReadModule {}
