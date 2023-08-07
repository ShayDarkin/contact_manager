import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import User from "../../entities/users/user.entity";
import { AppError } from "../../errors/error";
import Contact from "../../entities/contacts/contact.entity";

const deleteContactService = async (
  idContact: number,
  idTokenClient: number
): Promise<void> => {
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
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  await contactRepository.delete({ id: idContact });
};

export default deleteContactService;
