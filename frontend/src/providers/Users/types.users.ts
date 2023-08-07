export type TUser = {
  id: number;
  name: string;
  email: string;
  telefone: string;
  createdAt: string;
};

export type TUserRequest = {
  name: string;
  email: string;
  password: string;
  telefone: string;
};

export type TListUser = {
  id: number;
  name: string;
  email: string;
  telefone: string;
  createdAt: string;
}[];

export type TUserUpdate = {
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  telefone?: string | undefined;
};

export type TUserContactsResponse = {
  id: number;
  name: string;
  email: string;
  password: string;
  telefone: string;
  createdAt: string;
  contacts?:
    | {
        id: number;
        name: string;
        email: string;
        telefone: string;
        createdAt: string;
      }[]
    | undefined;
};

export type TLogin = {
  email: string;
  password: string;
};
export type TResponseLogin = {
  token: string;
};

export type TDataLogin = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    telefone: string;
    createdAt: string;
    contacts: {
      id: number;
      name: string;
      email: string;
      telefone: string;
      createdAt: string;
    }[];
  };
};

export type TUserLogin = {
  id: number;
  name: string;
  email: string;
  password: string;
  telefone: string;
  createdAt: string;
  contacts: {
    id: number;
    name: string;
    email: string;
    telefone: string;
    createdAt: string;
  }[];
};
