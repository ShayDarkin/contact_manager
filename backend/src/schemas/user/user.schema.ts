import { z } from "zod";
import { contactSchema, listContactsSchema } from "../contact/contact.schema";

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(65),
  email: z.string().email().max(50),
  password: z.string().max(50),
  telefone: z.string().max(15),
  createdAt: z.string(),
});

const userRequestSchema = userSchema.omit({
  createdAt: true,
  id: true,
});

const userResponseSchema = userSchema.omit({
  password: true,
});

const listUsersSchema = z.array(userResponseSchema);

const loginAccessSchema = userSchema.extend({
  token: z.string(),
  contacts: listContactsSchema,
});

const userUpdateSchema = userSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .partial();

const userContactsSchema = userSchema.extend({
  contacts: z.array(contactSchema).optional(),
});

export {
  userRequestSchema,
  userUpdateSchema,
  userContactsSchema,
  listUsersSchema,
  userResponseSchema,
  loginAccessSchema,
};
