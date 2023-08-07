import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import User from "../../entities/users/user.entity";
import { Repository } from "typeorm";

const ensureEmailUserAlreadyExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email: string = request.body.email;

  const clientRepository = AppDataSource.getRepository(User);

  const findUserEmail: boolean = await clientRepository.exist({
    where: {
      email: email,
    },
  });

  if (findUserEmail) {
    return response.status(409).json({
      message: "Email already exists",
    });
  }
  return next();
};

const ensureClientIdExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const idClient: number = parseInt(request.params.id);

  const clientRepository: Repository<User> = AppDataSource.getRepository(User);
  const client: boolean = await clientRepository.exist({
    where: {
      id: idClient,
    },
  });

  if (!client) {
    return response.status(404).json({
      message: "Client not found",
    });
  }

  return next();
};

export { ensureEmailUserAlreadyExists, ensureClientIdExistsMiddleware };
