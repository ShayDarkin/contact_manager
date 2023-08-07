import { Request, Response } from "express";
import { TLogin } from "../../interfaces/login/login.interface";
import createLoginService from "../../services/login/login.service";
import { autoSessionService } from "../../services/login/autoLogin.service";

const createSessionController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const dataSession: TLogin = request.body;

  const token = await createLoginService(dataSession);

  return response.status(200).json(token);
};

const autoSessionController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idTokenClient: number = parseInt(response.locals.token.id);
  const token = await autoSessionService(idTokenClient);

  return response.status(200).json(token);
};
export { createSessionController, autoSessionController };
