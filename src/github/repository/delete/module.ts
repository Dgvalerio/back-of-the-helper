import { Module } from '@nestjs/common';

import { GithubRepositoryDeleteService } from '@/github/repository/delete/service';
import { PrismaService } from '@/prisma.service';
import { UserReadModule } from '@/user/read/module';

@Module({
  imports: [UserReadModule],
  providers: [PrismaService, GithubRepositoryDeleteService],
  exports: [GithubRepositoryDeleteService],
})
export class GithubRepositoryDeleteModule {}
