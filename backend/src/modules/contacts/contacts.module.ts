import { ContactsRepository } from './repositories/contacts.repository';
import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { PrismaService } from 'src/database/prisma.service';
import { ContactsPrismaRepository } from './repositories/prisma/contacts.prisma.repository';

@Module({
  controllers: [ContactsController],
  providers: [
    ContactsService,
    PrismaService,
    {
      provide: ContactsRepository,
      useClass: ContactsPrismaRepository,
    },
  ],
})
export class ContactsModule {}
