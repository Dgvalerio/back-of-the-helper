import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { TimesheetAppointmentCreateService } from '@/timesheet/appointment/create/service';
import { TimesheetAppointmentCreate } from '@/timesheet/appointment/create/types';
import { ITimesheetAppointmentResolver } from '@/timesheet/appointment/types';
import { UserAuthGuard } from '@/user/auth/guard';
import { UserAuth } from '@/user/auth/types';

@Resolver()
export class TimesheetAppointmentResolver
  implements ITimesheetAppointmentResolver
{
  constructor(private createService: TimesheetAppointmentCreateService) {}

  @UseGuards(UserAuthGuard)
  @Mutation(() => [TimesheetAppointmentCreate.Output])
  async createTimesheetAppointments(
    @Context() context: UserAuth.Context,
    @Args('data') data: TimesheetAppointmentCreate.Input
  ): Promise<TimesheetAppointmentCreate.Output[]> {
    return await this.createService.create(
      context.req.user.id,
      data.appointments
    );
  }
}
