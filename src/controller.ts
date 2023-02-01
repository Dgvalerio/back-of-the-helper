import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  serverOn(): string {
    return 'Welcome to back-end of The Helper!';
  }
}
