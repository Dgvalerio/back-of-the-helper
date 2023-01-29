import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserRecovery } from '@/user/recovery/types';
import { hashPasswordTransform } from '@/user/utils/crypto';

import { compareSync } from 'bcrypt';
import { join } from 'path';

@Injectable()
export class UserRecoveryService implements UserRecovery.Service {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService
  ) {}

  async verifyEmailExists(email: string): Promise<void> {
    const exists = await this.prisma.user.findFirst({ where: { email } });

    if (!exists)
      throw new NotFoundException('Esse e-mail não está cadastrado!');
  }

  generateToken(): string {
    return String(Math.floor(Math.random() * 10 ** 13) + new Date().getTime());
  }

  async updateToken(email: string, token: string): Promise<void> {
    await this.prisma.user.update({
      where: { email },
      data: { resetPasswordToken: hashPasswordTransform.to(token) },
    });
  }

  async sendToken(email: string): Promise<boolean> {
    await this.verifyEmailExists(email);

    const token = this.generateToken();

    await this.updateToken(email, token);

    const send = await this.mailerService.sendMail({
      to: email,
      subject: 'Recuperação de conta',
      template: join(__dirname, 'recovery.hbs'),
      context: { token },
    });

    return !!send;
  }

  async compareTokens(email: string, token: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    const same = compareSync(token, user.resetPasswordToken);

    if (!same) throw new UnauthorizedException('Token inválido');
  }

  comparePasswords(password: string, confirmation: string): void {
    if (password !== confirmation) {
      throw new BadRequestException(
        'A confirmação de senha deve ser igual à nova senha!'
      );
    }
  }

  async updateUser(email: string, password: string): Promise<void> {
    await this.prisma.user.update({
      where: { email: email },
      data: {
        password: hashPasswordTransform.to(password),
        resetPasswordToken: null,
      },
    });
  }

  async updatePassword(data: UserRecovery.UpdateInput): Promise<boolean> {
    this.comparePasswords(data.password, data.passwordConfirmation);

    await this.verifyEmailExists(data.email);

    await this.compareTokens(data.email, data.token);

    await this.updateUser(data.email, data.password);

    return true;
  }
}
