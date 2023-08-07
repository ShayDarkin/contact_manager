import { Repository } from "typeorm";

import jwt from "jsonwebtoken";
import { AppError } from "../../errors/error";
import User from "../../entities/users/user.entity";
import AppDataSource from "../../data-source";

const autoSessionService = async (idToken: number): Promise<any> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: idToken,
    },
    relations: {
      contacts: true,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      email: user.email,
    },
    String(process.env.SECRET_KEY),
    {
      subject: String(user.id),
      expiresIn: String(process.env.EXPIRES_IN),
    }
  );
  const data = {
    token: token,
    user: user,
  };

  return data;
};
export { autoSessionService };
