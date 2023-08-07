import { z } from "zod";
import { contactSchema } from "../Contacts";

const userSchema = z.object({
  id: z.string(),
  name: z.string().max(60),
  email: z.string().email().max(50),
  password: z.string().max(30),
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

const listUserSchema = z.array(userResponseSchema);

const userUpdateSchema = userSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .partial();

const userContactsSchema = userSchema.extend({
  contacts: z.array(contactSchema).optional(),
});

const registeruserSchema = userRequestSchema.extend({
  repeatPassword: z.string().max(50),
});

export {
  userRequestSchema,
  userUpdateSchema,
  userContactsSchema,
  listUserSchema,
  userResponseSchema,
  registeruserSchema,
};
