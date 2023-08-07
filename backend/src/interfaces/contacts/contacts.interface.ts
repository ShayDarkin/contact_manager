import { z } from "zod";
import {
  contactRequestSchema,
  contactResponseSchema,
  contactSchema,
  contactUpdateSchema,
  contactusersSchema,
  listContactsSchema,
} from "../../schemas/contact/contact.schema";

type TContact = z.infer<typeof contactSchema>;

type TContactRequest = z.infer<typeof contactRequestSchema>;

type TListContacts = z.infer<typeof listContactsSchema>;

type TContactResponse = z.infer<typeof contactResponseSchema>;

type TContactUpdate = z.infer<typeof contactUpdateSchema>;

type TContactUser = z.infer<typeof contactusersSchema>;

export {
  TContact,
  TContactRequest,
  TContactResponse,
  TContactUpdate,
  TListContacts,
  TContactUser,
};
