import { Repository } from "typeorm";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../entities/users/user.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/error";
import { TLogin } from "../../interfaces/login/login.interface";

const createLoginService = async (loginData: TLogin): Promise<any> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      email: loginData.email,
    },
    relations: {
      contacts: true,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = await compare(loginData.password, user.password);

  if (!passwordMatch) {
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

  const dataComplete = {
    token: token,
    user: user,
  };

  return dataComplete;
};
export default createLoginService;
