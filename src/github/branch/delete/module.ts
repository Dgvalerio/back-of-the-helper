import { Module } from '@nestjs/common';

import { GithubBranchDeleteService } from '@/github/branch/delete/service';
import { PrismaService } from '@/prisma.service';
import { UserReadModule } from '@/user/read/module';

@Module({
  imports: [UserReadModule],
  providers: [PrismaService, GithubBranchDeleteService],
  exports: [GithubBranchDeleteService],
})
export class GithubBranchDeleteModule {}
