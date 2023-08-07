import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserListContext } from "../../providers/Users";
import { userContext } from "../../providers/Contacts";
import { TContactRequest } from "../../interfaces/Contacts";
import { StyledModalRegister } from "./ModalCreateContact.styled";

function ModalRegister() {
  const { open, setOpen } = useContext(UserListContext);

  const { registerContact } = useContext(userContext);

  const handleToClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, reset } = useForm<TContactRequest>({});

  const submit = (data: TContactRequest) => {
    registerContact(data);

    reset();
    handleToClose();
  };

  return (
    <StyledModalRegister open={open} onClose={handleToClose}>
      <div className="header-register">
        <h3>Cadastrar Contato</h3>
        <p onClick={handleToClose}>X</p>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <section className="name-contact">
          <label htmlFor="name">Nome</label>
          <input {...register("name")} type="name" id="name" />
        </section>
        <section className="name-contact">
          <label htmlFor="email">Email</label>
          <input {...register("email")} type="email" id="email" />
        </section>
        <section className="name-contact">
          <label htmlFor="telefone">Telefone</label>
          <input {...register("telefone")} type="telefone" id="telefone" />
        </section>

        <button type="submit" className="btn-register" onClick={handleToClose}>
          Criar contato
        </button>
      </form>
    </StyledModalRegister>
  );
}

export default ModalRegister;
