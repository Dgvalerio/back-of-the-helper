import { ConflictException } from '@nestjs/common';

export class EmailConflictError extends ConflictException {
  constructor() {
    super('Esse e-mail já foi utilizado!');
  }
}
