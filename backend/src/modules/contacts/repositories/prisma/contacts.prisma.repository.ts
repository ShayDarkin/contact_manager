import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ContactsRepository } from '../contacts.repository';
import { CreateContactDto } from '../../dtos/create.contacts.dto';
import { UpdateContactDto } from '../../dtos/update.contacts.dto';
import { Contact } from '../../entities/contacts.entity';

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactDto, userId: string): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, {
      ...data,
      userId: userId,
    });
    const newContact = await this.prisma.contact.create({
      data: { ...contact },
    });

    return newContact;
  }
  async findAll(): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany();
    return contacts;
  }
  async findOne(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });
    return contact;
  }
  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.prisma.contact.update({
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
}
