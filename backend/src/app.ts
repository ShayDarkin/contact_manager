import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import express, { Application } from "express";
import { loginRouter } from "./routes/login/login.routes";
import contactRouter from "./routes/contacts/contacts.routes";
import userRouter from "./routes/users/user.routes";
import { handleErrors } from "./errors/error";
import cors from "cors";

const app: Application = express();
app.use(express.json());

app.use(cors());

app.use("/users", userRouter);
app.use("/contact", contactRouter);
app.use("/login", loginRouter);

app.use(handleErrors);

export default app;
