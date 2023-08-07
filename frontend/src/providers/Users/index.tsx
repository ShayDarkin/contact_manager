import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  TUser,
  TUserRequest,
  TDataLogin,
  TLogin,
  TUserLogin,
} from "./types.users";
import api from "../../services/api";
import { userContext } from "../Contacts";
import Toast from "../../components/Toast/toast";

export interface IDefaultProviderProps {
  children: React.ReactNode;
}
interface IUserContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  idUser: number | undefined;
  setIdUser: React.Dispatch<React.SetStateAction<number | undefined>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: TUserLogin | null;
  setUser: React.Dispatch<React.SetStateAction<TUserLogin | null>>;
  userRegister: (formData: TUserRequest) => Promise<void>;
  userLogin: (formData: TLogin) => Promise<void>;
  userLogout: () => void;
  openEditeUser: boolean;
  setOpenEditeUser: React.Dispatch<React.SetStateAction<boolean>>;
  userEdit: (formData: TUserRequest) => Promise<void>;
  editUser: boolean;
  setEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  handleToCloseEditUser: () => void;
  userDelete: () => Promise<void>;
}
export const UserListContext = createContext({} as IUserContext);

export const UserListProvider = ({ children }: IDefaultProviderProps) => {
  const [token, setToken] = useState("");
  const [idUser, setIdUser] = useState<number | undefined>();
  const [editUser, setEditUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEditeUser, setOpenEditeUser] = useState(false);
  const [user, setUser] = useState<TUserLogin | null>(null);

  const navigate = useNavigate();

  const { setContactsUser } = useContext(userContext);

  const handleToCloseEditUser = () => {
    setOpenEditeUser(false);
  };

  const userRegister = async (formData: TUserRequest) => {
    try {
      await api.post<TUser>(`/users`, formData);

      Toast({ message: "Cadastro Realizado com Sucesso!", isSucess: true });

      navigate("/");
    } catch (error) {
      Toast({ message: "Falha no Cadastro, Tente Novamente!" });
    }
  };

  const userLogin = async (formData: TLogin) => {
    try {
      const response = await api.post<TDataLogin>(`/login`, formData);

      setUser(response.data.user);

      setIdUser(response.data.user.id);

      setContactsUser(response.data.user.contacts);

      localStorage.setItem("@token", response.data.token);

      localStorage.setItem("@id", String(response.data.user.id));

      Toast({ message: "Login Realizado com Sucesso!", isSucess: true });

      navigate("/");
    } catch (error) {
      console.error(error);

      Toast({ message: "Revise os Dados e tente Novamente!" });
    }
  };

  const userLogout = () => {
    setUser(null);

    localStorage.removeItem("@token");

    localStorage.removeItem("@id");

    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("@token");

    if (token) {
      const userAutoLogin = async () => {
        try {
          const response = await api.get("/login", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(response.data.user);
          console.log(response.data.user.id);

          setIdUser(response.data.user.id);
          setContactsUser(response.data.user.contacts);

          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };
      userAutoLogin();
    }
  });

  const userEdit = async (formData: TUserRequest) => {
    const token = localStorage.getItem("@token");

    const userId = localStorage.getItem("@id");

    if (token) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await api.patch<TUser | any>(
          `/users/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);

        Toast({ message: "Usuario Alterado com Sucesso!", isSucess: true });

        handleToCloseEditUser();
      } catch (error) {
        Toast({
          message: "Falha na Atualização, revise os dados e tente novamente!",
        });
      }
    }
  };

  const userDelete = async () => {
    const token = localStorage.getItem("@token");

    const userId = localStorage.getItem("@id");

    if (token) {
      try {
        await api.delete(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        userLogout();

        Toast({ message: "Usuario Deletado com Sucesso!", isSucess: true });
      } catch (error) {
        console.log(error);

        Toast({ message: "Falha na deleção, tente novamente!" });
      }
    }
  };

  return (
    <UserListContext.Provider
      value={{
        user,
        setUser,
        userRegister,
        userLogin,
        userLogout,
        token,
        setToken,
        idUser,
        setIdUser,
        open,
        setOpen,
        openEditeUser,
        setOpenEditeUser,
        userEdit,
        editUser,
        setEditUser,
        handleToCloseEditUser,
        userDelete,
      }}
    >
      {children}
    </UserListContext.Provider>
  );
};
