import { z } from "zod";
import {
  listUserSchema,
  registeruserSchema,
  userContactsSchema,
  userRequestSchema,
  userResponseSchema,
  userUpdateSchema,
} from "../../schemas/Users";

export type TUser = z.infer<typeof userResponseSchema>;

export type TUserRequest = z.infer<typeof userRequestSchema>;

export type TLisUser = z.infer<typeof listUserSchema>;

export type TUserUpdate = z.infer<typeof userUpdateSchema>;

export type TUserContactsResponse = z.infer<typeof userContactsSchema>; //token

export type TRegisterUser = z.infer<typeof registeruserSchema>;
