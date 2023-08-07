import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import User from "../../entities/users/user.entity";
import AppDataSource from "../../data-source";
import Contact from "../../entities/contacts/contact.entity";

const ensureEmailContactAlreadyExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email: string = request.body.email;
  const idTokenClient: number = parseInt(response.locals.token.id);

  const clientRepository: Repository<User> = AppDataSource.getRepository(User);

  const clientQueryBuilder = clientRepository.createQueryBuilder("client");

  const contactSearch = await clientQueryBuilder
    .leftJoinAndSelect(
      "client.contacts",
      "contact",
      "contact.email = :emailContact",
      {
        emailContact: email,
      }
    )
    .where("client.id = :idToken", { idToken: idTokenClient })
    .getOne();

  if (contactSearch?.contacts.length !== 0) {
    return response.status(409).json({
      message: "Email already exists",
    });
  }

  return next();
};

const ensureContactIdExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const idContact: number = parseInt(request.params.id);

  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);
  const contact: boolean = await contactRepository.exist({
    where: {
      id: idContact,
    },
  });

  if (!contact) {
    return response.status(404).json({
      message: "Contact not found",
    });
  }

  return next();
};

export { ensureEmailContactAlreadyExists, ensureContactIdExistsMiddleware };
