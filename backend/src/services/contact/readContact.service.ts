import { Repository } from "typeorm";
import User from "../../entities/users/user.entity";
import { AppError } from "../../errors/error";

import AppDataSource from "../../data-source";
import { contactArray } from "../../schemas/contact/contact.schema";

const readContactService = async (idContact: number, idTokenClient: number) => {
  const clientRepository: Repository<User> = AppDataSource.getRepository(User);

  const clientQueryBuilder = clientRepository.createQueryBuilder("client");

  const contactSearch = await clientQueryBuilder
    .leftJoinAndSelect("client.contacts", "contact", "contact.id = :idUrl", {
      idUrl: idContact,
    })
    .where("client.id = :idToken", { idToken: idTokenClient })
    .getOne();

  if (contactSearch?.contacts.length === 0) {
    throw new AppError("Insufficient permission", 403);
  }

  const contact = contactSearch?.contacts[0];

  const clientSearch = contactArray.parse(contact);

  return clientSearch;
};

export default readContactService;
