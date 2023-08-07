import { z } from "zod";
import { userResponseSchema } from "../user/user.schema";

const contactSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  email: z.string().email().max(45),
  telefone: z.string().max(25),
  createdAt: z.string(),
  users: userResponseSchema,
});

const contactusersSchema = contactSchema.omit({
  createdAt: true,
  id: true,
});

const contactRequestSchema = contactSchema.omit({
  createdAt: true,
  id: true,
  client: true,
});
const contactArray = contactSchema.omit({
  users: true,
});

const contactResponseSchema = contactSchema.omit({
  createdAt: true,
  users: true,
  password: true,
});
const listContactsSchema = z.array(contactArray);

const contactUpdateSchema = contactSchema
  .omit({
    id: true,
    createdAt: true,
    users: true,
  })
  .partial();

export {
  contactSchema,
  contactRequestSchema,
  contactResponseSchema,
  contactUpdateSchema,
  listContactsSchema,
  contactusersSchema,
  contactArray,
};
