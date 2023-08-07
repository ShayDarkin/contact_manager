import { createContext, useState } from "react";
import {
  TContactNoRelation,
  TContactRequest,
  TListContacts,
} from "./types.contacts";
import api from "../../services/api";
import { IDefaultProviderProps } from "../Users";
import Toast from "../../components/Toast/toast";

interface IContactContext {
  contactsUser: TListContacts;
  setContactsUser: React.Dispatch<React.SetStateAction<TListContacts>>;
  contactFounded: TContactNoRelation | undefined;
  setContactFounded: React.Dispatch<
    React.SetStateAction<TContactNoRelation | undefined>
  >;
  contactId: number | undefined;
  setContactId: React.Dispatch<React.SetStateAction<number | undefined>>;
  openEd: boolean;
  setOpenEd: React.Dispatch<React.SetStateAction<boolean>>;
  closeEdit: () => void;
  handleToClose: () => void;
  registerContact: (formData: TContactRequest) => Promise<void>;
  editContact: (formData: TContactRequest) => Promise<void>;
  deleteContact: () => Promise<void>;
}

export const userContext = createContext({} as IContactContext);

export const ContactProvider = ({ children }: IDefaultProviderProps) => {
  const [contactsUser, setContactsUser] = useState<TListContacts>([]);
  const [contactFounded, setContactFounded] = useState<
    TContactNoRelation | undefined
  >();
  const [contactId, setContactId] = useState<number | undefined>();
  const [openEd, setOpenEd] = useState<boolean>(false);

  const closeEdit = () => {
    setOpenEd(false);
  };

  const handleToClose = () => {
    setOpenEd(false);
  };

  const registerContact = async (formData: TContactRequest) => {
    const token = localStorage.getItem("@token");

    const userId = localStorage.getItem("@id");

    if (token) {
      try {
        const response = await api.post<TContactNoRelation>(
          `/contacts/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setContactsUser([...contactsUser, response.data]);

        Toast({ message: "Contato Criado Com Sucesso!", isSucess: true });

        handleToClose();
      } catch (error) {
        console.log(error);

        Toast({ message: "Algo Deu errado na criação de seu Contato!" });
      }
    }
  };

  const editContact = async (formData: TContactRequest) => {
    const token = localStorage.getItem("@token");

    if (token) {
      try {
        const response = await api.patch<TContactNoRelation>(
          `/contacts/${contactId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const contactAtual = contactsUser.map((contact) => {
          if (contact.id === contactId) {
            return response.data;
          } else {
            return contact;
          }
        });

        setContactsUser(contactAtual);

        Toast({ message: "Contato Alterado Com Sucesso!", isSucess: true });

        closeEdit();
      } catch (error) {
        Toast({ message: "Revise os Dados e Tente Novamente!" });
      }
    }
  };

  const deleteContact = async () => {
    const token = localStorage.getItem("@token");

    if (token) {
      try {
        await api.delete(`/contact/${contactId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contactsAtual = contactsUser.filter((contactUser) => {
          if (contactUser !== contactFounded) {
            return contactUser;
          }
        });

        setContactsUser(contactsAtual);

        Toast({ message: "Contato Deletado com Sucesso!", isSucess: true });

        closeEdit();
      } catch (error) {
        console.log(error);

        Toast({ message: "Algo deu errado na Deleção!" });
      }
    }
  };

  return (
    <userContext.Provider
      value={{
        contactsUser,
        setContactsUser,
        contactFounded,
        setContactFounded,
        contactId,
        setContactId,
        openEd,
        setOpenEd,
        editContact,
        deleteContact,
        closeEdit,
        registerContact,
        handleToClose,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
