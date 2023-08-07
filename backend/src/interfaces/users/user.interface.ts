import { z } from "zod";
import {
  listUsersSchema,
  userContactsSchema,
  userRequestSchema,
  userResponseSchema,
  userUpdateSchema,
} from "../../schemas/user/user.schema";

type TUser = z.infer<typeof userResponseSchema>;

type TUserRequest = z.infer<typeof userRequestSchema>;

type TListUser = z.infer<typeof listUsersSchema>;

type TUserUpdate = z.infer<typeof userUpdateSchema>;

type TUserContactsResponse = z.infer<typeof userContactsSchema>; //token

export { TUser, TUserRequest, TListUser, TUserUpdate, TUserContactsResponse };
