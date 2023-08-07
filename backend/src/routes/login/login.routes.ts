import { Router } from "express";
import { loginSchema } from "../../schemas/login/login.schema";
import ensureBodyIsValidMiddleware from "../../middlewares/schema.middleware";
import {
  autoSessionController,
  createSessionController,
} from "../../controllers/login/login.controller";
import { ensureTokenValidMiddleware } from "../../middlewares/login/login.middleware";

const loginRouter: Router = Router();

loginRouter.post(
  "",
  ensureBodyIsValidMiddleware(loginSchema),
  createSessionController
);

loginRouter.get("", ensureTokenValidMiddleware, autoSessionController);

export { loginRouter };
