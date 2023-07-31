import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;
  fullName: string;
  email: string;
  telefone: string;
  readonly createAt: Date;

  constructor() {
    this.id = randomUUID();
  }
}
