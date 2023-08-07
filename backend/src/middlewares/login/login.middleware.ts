import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/error";

const ensureUserTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const idClientUrl: number = parseInt(request.params.id);

  const idTokenClient: number = parseInt(response.locals.token.id);

  if (idTokenClient !== idClientUrl) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

const ensureTokenValidMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const token = authorization.split(" ")[1];

  jwt.verify(
    token,
    String(process.env.SECRET_KEY!),
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(err.message, 401);
      }
      response.locals.token = {
        id: decoded?.sub,
        email: decoded.email,
      };
      return next();
    }
  );
};

export { ensureTokenValidMiddleware, ensureUserTokenMiddleware };
