import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import User from "../../entities/users/user.entity";
import { TUser, TUserRequest } from "../../interfaces/users/user.interface";
import { userResponseSchema } from "../../schemas/user/user.schema";

const createUserService = async (userData: TUserRequest): Promise<TUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: TUserRequest = userRepository.create({ ...userData });

  await userRepository.save(user);

  const newUser: TUser = userResponseSchema.parse(user);

  return newUser;
};
export default createUserService;
