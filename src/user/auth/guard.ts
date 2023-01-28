import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { UserAuth } from '@/user/auth/types';

@Injectable()
export class UserAuthGuard extends AuthGuard('jwt') implements UserAuth.Guard {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
}
