import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserListContext } from "../../providers/Users";
import { TSession } from "../../interfaces/Login";
import LoginStyled from "./Login.style";
const schema = yup
  .object({
    email: yup.string().required("Preencha Seu Email"),
    password: yup.string().required("Preencha Sua Senha"),
  })
  .required();

function LoginPage() {
  const { userLogin } = useContext(UserListContext);

  const [isHidden, setIsHidden] = useState(true);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const redirectPage = () => {
    navigate("/register");
  };

  const submit = (formData: TSession) => {
    userLogin(formData);
  };

  const showPassword = () => {
    setIsHidden(!isHidden);
  };

  return (
    <LoginStyled>
      <h1>
        <b>Agenda Virtual</b>
      </h1>
      <nav>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(submit)}>
          <section className="email">
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} id="email" />
            {errors.email?.message}
          </section>

          <section className="password">
            <label htmlFor="password">Senha</label>
            <div className="icon-input">
              <input
                type={isHidden ? "password" : "text"}
                {...register("password")}
                id="password"
              />
              <button
                className="btn-show-closed"
                type="button"
                onClick={showPassword}
              ></button>
            </div>
            {errors.password?.message}

            <button type="submit" className="login">
              Entrar
            </button>
          </section>
        </form>

        <footer>
          <p>Ainda não possui uma conta?</p>
          <button onClick={() => redirectPage()} className="register">
            Cadastre-se
          </button>
        </footer>
      </nav>
    </LoginStyled>
  );
}

export default LoginPage;
