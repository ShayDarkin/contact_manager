import { CreateContactDto } from '../dtos/create.contacts.dto';
import { UpdateContactDto } from '../dtos/update.contacts.dto';
import { Contact } from '../entities/contacts.entity';

export abstract class ContactsRepository {
  abstract create(data: CreateContactDto): Promise<Contact>;
  abstract findAll(): Promise<Contact[]>;
  abstract findOne(id: string): Promise<Contact>;
  abstract update(id: string, data: UpdateContactDto): Promise<Contact>;
  abstract delete(id: string): Promise<void>;
}
