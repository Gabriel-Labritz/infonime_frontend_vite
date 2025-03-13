import { createContext } from "react";
import useAuth from "../hooks/useAuth";

// types
import { userRegisterInterface } from "../utils-types/user-register-interface";
import { userLoginInterface } from "../utils-types/user-login-interface";

interface contextProviderProps {
  children: React.ReactNode;
}

interface UserContextType {
  register: (userData: userRegisterInterface) => Promise<void>;
  login: (userData: userLoginInterface) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function ContextProvider({ children }: contextProviderProps) {
  const { register, login, logout } = useAuth();

  return (
    <UserContext.Provider value={{ register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, ContextProvider };
