import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;
  fullName: string;
  email: string;
  telefone: string;
  readonly createAt: Date;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
  }
}
