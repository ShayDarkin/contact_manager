import { Repository } from "typeorm";
import { TUser, TUserRequest } from "../../interfaces/users/user.interface";
import AppDataSource from "../../data-source";
import User from "../../entities/users/user.entity";
import { userResponseSchema } from "../../schemas/user/user.schema";

const updateUsersService = async (
  dataClient: TUserRequest,
  idClient: number
): Promise<TUser> => {
  const clientRepository: Repository<User> = AppDataSource.getRepository(User);

  const client: User | null = await clientRepository.findOne({
    where: { id: idClient },
  });

  const newClient: User = clientRepository.create({
    ...client,
    ...dataClient,
  });

  await clientRepository.save(newClient);

  const returnClient: TUser = userResponseSchema.parse(newClient);

  return returnClient;
};

export default updateUsersService;
