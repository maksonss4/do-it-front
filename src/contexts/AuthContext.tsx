import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IUser {
  email: string;
  id: string;
  name: string;
}

interface IAuthState {
  accessToken: string;
  user: IUser;
}

export interface ISignIn {
  email: string;
  password: string;
}

interface IAuthContextData {
  signIn: (creadentials: ISignIn) => Promise<void>;
  signOut: () => void;
  user: IUser;
  accessToken: string;
}

const AuthContext = createContext({} as IAuthContextData);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within as AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [data, setData] = useState<IAuthState>(() => {
    const accessToken = localStorage.getItem("@Doit:accessToken");
    const user = localStorage.getItem("@Doit:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = async ({ email, password }: ISignIn) => {
    const response = await api.post("/login", { email, password });
    const { accessToken, user } = response.data;

    localStorage.setItem("@Doit:accessToken", accessToken);
    localStorage.setItem("@Doit:user", JSON.stringify(user));

    setData({ accessToken, user });
  };

  const signOut = () => {
    localStorage.removeItem("@Doit:accessToken");
    localStorage.removeItem("@Doit:user");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: data.user,
        accessToken: data.accessToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
