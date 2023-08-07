import { Link } from "react-router-dom";
import { Heading, Message } from "./page404.styled";

const Page404 = () => {
  return (
    <div>
      <Heading>Erro 404</Heading>
      <Message>
        Desculpe, a página que você está procurando não foi encontrada.
      </Message>
      <Link to="/">Voltar para o início</Link>
    </div>
  );
};

export default Page404;
