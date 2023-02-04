import { Module } from '@nestjs/common';

import { GithubRepositoryCreateService } from '@/github/repository/create/service';
import { PrismaService } from '@/prisma.service';
import { UserReadModule } from '@/user/read/module';

@Module({
  imports: [UserReadModule],
  providers: [PrismaService, GithubRepositoryCreateService],
  exports: [GithubRepositoryCreateService],
})
export class GithubRepositoryCreateModule {}
