import { Repository } from "typeorm";
import {
  TContactRequest,
  TContactResponse,
} from "../../interfaces/contacts/contacts.interface";
import AppDataSource from "../../data-source";
import User from "../../entities/users/user.entity";
import Contact from "../../entities/contacts/contact.entity";
import { userResponseSchema } from "../../schemas/user/user.schema";
import { AppError } from "../../errors/error";

const createContactService = async (
  contactData: TContactRequest,
  tokenUserId: number,
  idUser: number
): Promise<TContactResponse> => {
  if (tokenUserId !== idUser) {
    throw new AppError("Insufficient permission", 403);
  }

  const clientRepository: Repository<User> = AppDataSource.getRepository(User);

  const client: User | any = await clientRepository.findOneBy({
    id: tokenUserId,
  });

  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const newContactData = {
    ...contactData,
    client: client,
  };

  const contact: Contact = contactRepository.create(newContactData);

  await contactRepository.save(contact);

  const clientSearch: TContactResponse = userResponseSchema.parse(contact);

  return clientSearch;
};
export default createContactService;
