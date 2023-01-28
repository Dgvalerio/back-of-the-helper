import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UserAuth } from '@/user/auth/types';
import { UserReadService } from '@/user/read/service';
import { UserRead } from '@/user/read/types';
import { User } from '@prisma/client';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
  implements UserAuth.Strategy
{
  constructor(private userService: UserReadService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: User['id'] }): Promise<UserRead.Output> {
    const user = await this.userService.getOne({ id: payload.sub });

    if (!user) throw new UnauthorizedException('Não autorizado!');

    return user;
  }
}
