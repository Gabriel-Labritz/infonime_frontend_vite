import { useState } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { userLoginInterface } from "../../utils-types/user-login-interface";

// components
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { MdOutlineEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";

import "./Login.css";

function Login() {
  const { login } = useUserContext();
  const [user, setUser] = useState<userLoginInterface>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await login(user);
  };

  return (
    <>
      <div className="main-container-sign-in">
        <div className="background-area-sign-in">
          <img src="../background.jpg" alt="background" />
        </div>
        <div className="form-container-sign-in">
          <img src="../logo_052b647f68.png" alt="logo" />
          <h2>Acesse sua conta !</h2>

          <div className="form-area-sign-in">
            <form method="post" onSubmit={handleSubmit}>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                icon={<MdOutlineEmail size={28} />}
                onHandleChange={handleChange}
              />
              <Input
                type="password"
                name="password"
                placeholder="Senha"
                icon={<FiLock size={25} />}
                onHandleChange={handleChange}
              />
              <Button txtButton="Entrar" />
            </form>

            <a href="/register" className="sign-up-container">
              <div className="sign-up-box">
                <div className="box-info">
                  Não possui uma conta ?
                  <span className="span-area">Cadastre - se</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
