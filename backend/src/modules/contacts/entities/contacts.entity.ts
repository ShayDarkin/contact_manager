import { randomUUID } from 'node:crypto';

export class Contact {
  readonly id: string;
  fullName: string;
  email: string;
  telefone: string;
  readonly createAt: Date;
  userId: string;

  constructor() {
    this.id = randomUUID();
  }
}
