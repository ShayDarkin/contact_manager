import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import User from "../../entities/users/user.entity";
import { TListContacts } from "../../interfaces/contacts/contacts.interface";
import { listContactsSchema } from "../../schemas/contact/contact.schema";

const listContactsService = async (idToken: number): Promise<TListContacts> => {
  const clientRepository: Repository<User> = AppDataSource.getRepository(User);

  const client: User | null = await clientRepository.findOne({
    where: {
      id: idToken,
    },
    relations: {
      contacts: true,
    },
  });

  const contacts = client?.contacts;

  const returnContacts: TListContacts = listContactsSchema.parse(contacts);

  return returnContacts;
};

export default listContactsService;
