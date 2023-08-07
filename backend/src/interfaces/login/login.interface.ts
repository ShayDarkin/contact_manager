import { z } from "zod";
import { loginAccessSchema } from "../../schemas/user/user.schema";
import { loginSchema } from "../../schemas/login/login.schema";

type TLogin = z.infer<typeof loginSchema>;

type TResponseLogin = z.infer<typeof loginAccessSchema>;

export { TLogin, TResponseLogin };
