import { useState } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { userRegisterInterface } from "../../utils-types/user-register-interface";

// components
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";

import "./Register.css";

function Register() {
  const { register } = useUserContext();
  const [user, setUser] = useState<userRegisterInterface>({
    user_name: "",
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
    await register(user);
  };

  return (
    <>
      <div className="main-container">
        <div className="background-area">
          <img src="../background.jpg" alt="background" />
        </div>
        <div className="form-container">
          <img src="../logo_052b647f68.png" alt="logo" />
          <h2>Crie sua conta !</h2>

          <div className="form-area">
            <form method="post" onSubmit={handleSubmit}>
              <Input
                type="text"
                name="user_name"
                placeholder="Nome de usuário"
                icon={<FaRegUser size={25} />}
                onHandleChange={handleChange}
              />
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
              <Button txtButton="Cadastre - se" />
            </form>

            <a href="/login" className="sign-in-container">
              <div className="sign-in-box">
                <div className="box-info">
                  Já possui uma conta ?<span className="span-area">Entrar</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
