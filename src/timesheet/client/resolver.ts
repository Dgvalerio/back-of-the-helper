import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';

import { TimesheetClientReadService } from '@/timesheet/client/read/service';
import { TimesheetClientRead } from '@/timesheet/client/read/types';
import { ITimesheetClientResolver } from '@/timesheet/client/types';
import { UserAuthGuard } from '@/user/auth/guard';
import { UserAuth } from '@/user/auth/types';

@Resolver()
export class TimesheetClientResolver implements ITimesheetClientResolver {
  constructor(private readService: TimesheetClientReadService) {}

  @UseGuards(UserAuthGuard)
  @Query(() => [TimesheetClientRead.Client])
  async getAllTimesheetClient(
    @Context() context: UserAuth.Context
  ): Promise<TimesheetClientRead.Client[]> {
    return await this.readService.getAll({ userId: context.req.user.id });
  }
}
