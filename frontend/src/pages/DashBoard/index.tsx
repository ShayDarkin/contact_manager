import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserListContext } from "../../providers/Users";
import DashBoardStyled from "./DashBoard.styled";
import CardsContactsDashboard from "../../components/CardContacts";
import CardEditProfile from "../../components/ModalEditUser";
import ModalRegister from "../../components/ModalCreateContact";
import ModalEditcontacts from "../../components/ModalContactEdit";

function DashboardPage() {
  const { user, userLogout, setOpenEditeUser } = useContext(UserListContext);

  const handleClickToOpenEd = () => {
    setOpenEditeUser(true);
  };

  return (
    <DashBoardStyled>
      <header>
        <div className="container-header">
          <h1>
            <b>Agenda Virtual</b>
          </h1>
          <Link to="/">
            <p onClick={() => userLogout()}>Sair</p>
          </Link>
        </div>
      </header>
      <main>
        <section className="information-dashboard">
          <div className="container-main">
            <h2>Olá, {user?.name}</h2>
            <p onClick={handleClickToOpenEd}>Editar Perfil</p>
          </div>
        </section>

        <CardsContactsDashboard />
      </main>
      <CardEditProfile />
      <ModalRegister />
      <ModalEditcontacts />
    </DashBoardStyled>
  );
}

export default DashboardPage;
