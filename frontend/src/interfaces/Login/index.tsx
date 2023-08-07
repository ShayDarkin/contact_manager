import { z } from "zod";
import { loginSchema, responseLoginSchema } from "../../schemas/Login";

export type TLogin = z.infer<typeof loginSchema>;

export type TResponseLogin = z.infer<typeof responseLoginSchema>;
