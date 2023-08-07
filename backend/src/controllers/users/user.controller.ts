import { Request, Response } from "express";
import {
  TListUser,
  TUser,
  TUserRequest,
} from "../../interfaces/users/user.interface";
import updateUsersService from "../../services/users/update.user.service";
import deleteUserService from "../../services/users/delete.user.service";
import readUsersService from "../../services/users/read.user.service";
import createUserService from "../../services/users/create.user.service";
import listClientsService from "../../services/users/readAll.user.service";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const UserData: TUserRequest = request.body;

  const newUser: TUser = await createUserService(UserData);

  return response.status(201).json(newUser);
};

const listUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user: TListUser = await listClientsService();

  return response.status(200).json(user);
};

const readUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idUser: number = parseInt(request.params.id);

  const user: TUser | null = await readUsersService(idUser);

  return response.json(user);
};

const updateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const UserData: TUserRequest = request.body;
  const idUser: number = parseInt(request.params.id);
  const newUser: TUser = await updateUsersService(UserData, idUser);
  return response.json(newUser);
};

const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idUser: number = parseInt(request.params.id);

  await deleteUserService(idUser);

  return response.status(204).json();
};

export {
  createUserController,
  listUsersController,
  readUserController,
  updateUserController,
  deleteUserController,
};
