import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

// types
import { userRegisterInterface } from "../utils-types/user-register-interface";
import { userLoginInterface } from "../utils-types/user-login-interface";
import { userAuthInterface } from "../utils-types/user-auth-interface";

interface UserContextProviderProps {
  children: React.ReactNode;
}

interface UserContextType {
  register: (userData: userRegisterInterface) => Promise<void>;
  login: (userData: userLoginInterface) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  authenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserContextProvider({ children }: UserContextProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token !== undefined) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  async function register(user: userRegisterInterface): Promise<void> {
    try {
      setIsLoading(true);

      const response = await api.post<userAuthInterface>(
        "/users/register",
        user
      );
      authUser(response.data);

      toast.success(
        response?.data?.message || "Usuário cadastrado com sucesso!"
      );
      navigate("/");
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro ao se cadastrar, tente novamente.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function login(user: userLoginInterface): Promise<void> {
    try {
      setIsLoading(true);

      const response = await api.post<userAuthInterface>("/users/login", user);
      authUser(response.data);

      toast.success(response.data.message || "Login realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro ao se logar, tente novamente.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  function authUser(data: userAuthInterface): void {
    if (!data || !data.token) {
      console.error("Erro ao autenticar usuário: dados inválidos.");
      return;
    }

    localStorage.setItem("token", JSON.stringify(data.token));
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    setAuthenticated(true);
  }

  function logout(): void {
    setAuthenticated(false);
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;
    navigate("/login");
  }

  return (
    <UserContext.Provider
      value={{ register, login, logout, isLoading, authenticated }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
