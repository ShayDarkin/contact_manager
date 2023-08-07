import { Repository } from "typeorm";
import User from "../../entities/users/user.entity";
import AppDataSource from "../../data-source";

const deleteUserService = async (idClient: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  await userRepository.delete({ id: idClient });
};

export default deleteUserService;
