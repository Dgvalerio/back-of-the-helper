import { Module } from '@nestjs/common';

import { GithubBranchReadService } from '@/github/branch/read/service';
import { PrismaService } from '@/prisma.service';
import { UserReadModule } from '@/user/read/module';

@Module({
  imports: [UserReadModule],
  providers: [PrismaService, GithubBranchReadService],
  exports: [GithubBranchReadService],
})
export class GithubBranchReadModule {}
