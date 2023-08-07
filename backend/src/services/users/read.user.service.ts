import { Repository } from "typeorm";
import { TUser } from "../../interfaces/users/user.interface";
import User from "../../entities/users/user.entity";
import AppDataSource from "../../data-source";
import { userResponseSchema } from "../../schemas/user/user.schema";

const readUsersService = async (idClient: number): Promise<TUser | null> => {
  const clientRepository: Repository<User> = AppDataSource.getRepository(User);

  const client: User | null = await clientRepository.findOne({
    where: { id: idClient },
  });

  const returnClient: TUser = userResponseSchema.parse(client);

  return returnClient;
};

export default readUsersService;
