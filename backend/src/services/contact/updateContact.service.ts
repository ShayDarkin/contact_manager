import { Repository } from "typeorm";
import User from "../../entities/users/user.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/error";
import Contact from "../../entities/contacts/contact.entity";
import { contactArray } from "../../schemas/contact/contact.schema";
import { TContactRequest } from "../../interfaces/contacts/contacts.interface";

const updateContactsService = async (
  dataContact: TContactRequest,
  idContact: number,
  idToken: number
) => {
  const clientRepository: Repository<User> = AppDataSource.getRepository(User);

  const clientQueryBuilder = clientRepository.createQueryBuilder("client");

  const contactSearch = await clientQueryBuilder
    .leftJoinAndSelect("client.contacts", "contact", "contact.id = :idUrl", {
      idUrl: idContact,
    })
    .where("client.id = :idToken", { idToken: idToken })
    .getOne();

  if (contactSearch?.contacts.length === 0) {
    throw new AppError("Insufficient permission", 403);
  }

  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact = contactSearch?.contacts[0];

  const newUser: Contact = contactRepository.create({
    ...contact,
    ...dataContact,
  });

  await contactRepository.save(newUser);

  const returnUser = contactArray.parse(newUser);

  return returnUser;
};

export { updateContactsService };
