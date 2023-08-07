import { Router } from "express";
import {
  ensureTokenValidMiddleware,
  ensureUserTokenMiddleware,
} from "../../middlewares/login/login.middleware";
import {
  contactRequestSchema,
  contactUpdateSchema,
} from "../../schemas/contact/contact.schema";
import ensureBodyIsValidMiddleware from "../../middlewares/schema.middleware";
import {
  ensureContactIdExistsMiddleware,
  ensureEmailContactAlreadyExists,
} from "../../middlewares/contacts/contacts.middleware";
import {
  createContactController,
  deleteContactController,
  listContactsController,
  readContactController,
  updateContactController,
} from "../../controllers/contacts/contact.controller";

const contactRouter: Router = Router();

contactRouter.post(
  "/:id",
  ensureTokenValidMiddleware,
  ensureUserTokenMiddleware,
  ensureBodyIsValidMiddleware(contactRequestSchema),
  ensureEmailContactAlreadyExists,
  createContactController
);

contactRouter.get("", ensureTokenValidMiddleware, listContactsController);

contactRouter.get(
  "/:id",
  ensureContactIdExistsMiddleware,
  ensureTokenValidMiddleware,
  readContactController
);

contactRouter.patch(
  "/:id",
  ensureBodyIsValidMiddleware(contactUpdateSchema),
  ensureContactIdExistsMiddleware,
  ensureTokenValidMiddleware,
  updateContactController
);

contactRouter.delete(
  "/:id",
  ensureContactIdExistsMiddleware,
  ensureTokenValidMiddleware,
  deleteContactController
);

export default contactRouter;
