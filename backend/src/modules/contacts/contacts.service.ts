import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dtos/create.contacts.dto';
import { ContactsRepository } from './repositories/contacts.repository';
import { UpdateContactDto } from './dtos/update.contacts.dto';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}

  async create(data: CreateContactDto, userId: string) {
    return await this.contactsRepository.create(data, userId);
  }

  async findAll() {
    return await this.contactsRepository.findAll();
  }

  async findOne(id: string) {
    const contact = await this.contactsRepository.findOne(id);

    if (!contact) {
      throw new NotFoundException('Contact Not Found');
    }
    return contact;
  }

  async update(id: string, data: UpdateContactDto) {
    const contact = await this.contactsRepository.update(id, data);

    if (!contact) {
      throw new NotFoundException('Contact Not Found');
    }
    return contact;
  }

  async delete(id: string) {
    const contact = await this.contactsRepository.delete(id);

    return contact;
  }
}
