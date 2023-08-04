import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';
import { Contact } from 'src/modules/contacts/entities/contacts.entity';

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
