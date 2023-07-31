/* import { CreateContactDto } from '../dtos/create.contacts.dto';
import { Contact } from '../entities/contacts.entity';
import { ContactsRepository } from './contacts.repository';

export class ContactsInMemoryRepository implements ContactsRepository {
  private database: Contact[] = [];

  async create(data: CreateContactDto): Promise<Contact> {
    const newContact = new Contact();
    Object.assign(newContact, {
      ...data,
    });
    this.database.push(newContact);
    return newContact;
  }
  async findAll(): Promise<Contact[]> {
    return this.database;
  }
  async findOne(id: string): Promise<Contact> {
    const contact = this.database.find((contact) => contact.id === id);
    return contact;
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.database.update({
      where: { id },
      data: { ...data },
    });
    return contact;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.contact.findUnique({
      where: { id },
    });
  }
} */
