import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserAuth } from '@/user/auth/types';
import { UserReadService } from '@/user/read/service';
import { UserRead } from '@/user/read/types';

import { compareSync } from 'bcrypt';

@Injectable()
export class UserAuthService implements UserAuth.Service {
  constructor(
    private userService: UserReadService,
    private jwtService: JwtService
  ) {}

  async validate(data: UserAuth.Input): Promise<UserAuth.Output> {
    const user = await this.userService.getOne({ email: data.email });

    const validPassword = compareSync(data.password, user.password);

    if (!validPassword) throw new UnauthorizedException('Senha incorreta!');

    const token = await this.jwtToken(user);

    return { user, token };
  }

  async jwtToken(user: UserRead.Output): Promise<string> {
    const payload = { username: user.name, sub: user.id };

    return this.jwtService.signAsync(payload);
  }
}
