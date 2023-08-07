import { Router } from "express";
import {
  userRequestSchema,
  userUpdateSchema,
} from "../../schemas/user/user.schema";
import ensureBodyIsValidMiddleware from "../../middlewares/schema.middleware";
import {
  ensureClientIdExistsMiddleware,
  ensureEmailUserAlreadyExists,
} from "../../middlewares/user/user.middleware";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  readUserController,
  updateUserController,
} from "../../controllers/users/user.controller";
import {
  ensureTokenValidMiddleware,
  ensureUserTokenMiddleware,
} from "../../middlewares/login/login.middleware";

const userRouter: Router = Router();

userRouter.post(
  "",
  ensureBodyIsValidMiddleware(userRequestSchema),
  ensureEmailUserAlreadyExists,
  createUserController
);

userRouter.get("", ensureTokenValidMiddleware, listUsersController);

userRouter.get(
  "/:id",
  ensureTokenValidMiddleware,
  ensureUserTokenMiddleware,
  ensureClientIdExistsMiddleware,
  readUserController
);

userRouter.patch(
  "/:id",
  ensureTokenValidMiddleware,
  ensureUserTokenMiddleware,
  ensureBodyIsValidMiddleware(userUpdateSchema),
  ensureClientIdExistsMiddleware,
  updateUserController
);

userRouter.delete(
  "/:id",
  ensureTokenValidMiddleware,
  ensureUserTokenMiddleware,
  ensureClientIdExistsMiddleware,
  deleteUserController
);

export default userRouter;
