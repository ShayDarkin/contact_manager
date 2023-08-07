import { Repository } from "typeorm";
import { TListUser } from "../../interfaces/users/user.interface";
import User from "../../entities/users/user.entity";
import AppDataSource from "../../data-source";
import { listUsersSchema } from "../../schemas/user/user.schema";

const listClientsService = async (): Promise<TListUser> => {
  const clientRepository: Repository<User> = AppDataSource.getRepository(User);

  const clients: User[] = await clientRepository.find();

  const returnClients: TListUser = listUsersSchema.parse(clients);

  return returnClients;
};

export default listClientsService;
