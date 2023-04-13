import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TimesheetInfosCreateService } from '@/timesheet/infos/create/service';
import { TimesheetInfosCreate } from '@/timesheet/infos/create/types';
import { TimesheetInfosDeleteService } from '@/timesheet/infos/delete/service';
import { TimesheetInfosReadService } from '@/timesheet/infos/read/service';
import { TimesheetInfosRead } from '@/timesheet/infos/read/types';
import { ITimesheetInfosResolver } from '@/timesheet/infos/types';
import { TimesheetInfosUpdateService } from '@/timesheet/infos/update/service';
import { TimesheetInfosUpdate } from '@/timesheet/infos/update/types';
import { UserAuthGuard } from '@/user/auth/guard';
import { UserAuth } from '@/user/auth/types';

@Resolver()
export class TimesheetInfosResolver implements ITimesheetInfosResolver {
  constructor(
    private createService: TimesheetInfosCreateService,
    private readService: TimesheetInfosReadService,
    private updateService: TimesheetInfosUpdateService,
    private deleteService: TimesheetInfosDeleteService
  ) {}

  @UseGuards(UserAuthGuard)
  @Mutation(() => TimesheetInfosRead.Output)
  async createTimesheetInfos(
    @Context() context: UserAuth.Context,
    @Args('data') data: TimesheetInfosCreate.Input
  ): Promise<TimesheetInfosRead.Output> {
    return await this.createService.create(context.req.user.id, data);
  }

  @UseGuards(UserAuthGuard)
  @Query(() => TimesheetInfosRead.Output)
  async getOneTimesheetInfos(
    @Context() context: UserAuth.Context
  ): Promise<TimesheetInfosRead.Output> {
    return await this.readService.getOne({ userId: context.req.user.id });
  }

  @UseGuards(UserAuthGuard)
  @Query(() => [TimesheetInfosRead.Output])
  async getAllTimesheetInfos(
    @Context() context: UserAuth.Context
  ): Promise<TimesheetInfosRead.Output[]> {
    return await this.readService.getAll({ userId: context.req.user.id });
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => TimesheetInfosRead.Output)
  async updateTimesheetInfos(
    @Context() context: UserAuth.Context,
    @Args('data') data: TimesheetInfosUpdate.Input
  ): Promise<TimesheetInfosRead.Output> {
    return await this.updateService.update(context.req.user.id, data);
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => Boolean)
  async deleteTimesheetInfos(
    @Context() context: UserAuth.Context
  ): Promise<boolean> {
    return await this.deleteService.delete(context.req.user.id);
  }
}
