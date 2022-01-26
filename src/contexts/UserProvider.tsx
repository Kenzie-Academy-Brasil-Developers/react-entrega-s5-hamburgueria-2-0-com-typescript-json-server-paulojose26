import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { api } from "../services/api";

interface UserProviderProps {
  children: ReactNode;
}
interface LoginData {
  email: string;
  password: string;
}
interface RegisterData {
  name: string;
  email: string;
  password: string;
}
interface User {
  id: string;
  name: string;
  email: string;
}
interface UserContextData {
  user: User;
  token: string;
  getUser: () => Promise<void>;
  SingIn: (data: LoginData) => Promise<void>;
  SingUp: (data: RegisterData) => Promise<void>;
  LogOut: () => Promise<void>;
}

const AuthContext = createContext<UserContextData>({} as UserContextData);
export const useUser = () => useContext(AuthContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [token, setToken] = useState<string>(localStorage.getItem("@BurgueKenzie-token") || "");
  const [user, setUser] = useState<User>({} as User);

  const getUser = useCallback(async () => {
    const tokenJson = localStorage.getItem("@BurgueKenzie-token");
    const userJson = localStorage.getItem("@BurgueKenzie-user");

    if (userJson && tokenJson) {
      const userParse = JSON.parse(userJson) as User;
      await api.get(`/users/${ JSON.parse(userParse.id)}`,
      {
        headers: {
          Authorization: `Bearer ${tokenJson}`,
        },
      }).then((response) => {
        setUser(response.data);
        setToken(tokenJson);
        localStorage.setItem("@BurgueKenzie-user", JSON.stringify(response.data));
      })
      .catch(() => {
        localStorage.clear();
        setToken("");
        setUser({} as User);
      });
    } else {
      localStorage.clear();
      setUser({} as User);
      setToken("");
    }
  }, []);

  const SingIn = useCallback(async ({ email, password }: LoginData) => {
    await api.post("/login", { email, password }).then((response) => {
      localStorage.setItem("@BurgueKenzie-token", response.data.accessToken);
      localStorage.setItem(
        "@BurgueKenzie-user",
        JSON.stringify(response.data.user)
      );
      setToken(response.data.accessToken);
      setUser(response.data.user as User);
    });
  }, []);

  const SingUp = useCallback(
    async ({ email, name, password }: RegisterData) => {
      await api.post("/users", { email, name, password });
    },
    []
  );

  const LogOut = useCallback(async () => {
    setToken("");
    setUser({} as User);
    localStorage.clear();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, getUser, SingIn, SingUp, LogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
