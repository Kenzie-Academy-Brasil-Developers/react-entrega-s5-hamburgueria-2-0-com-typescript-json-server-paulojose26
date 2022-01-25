import { createContext, ReactNode, useCallback, useContext, useState } from "react";

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
interface User{
    id: string;
    name: string;
    email: string;
}
interface UserContextData{
    user: User;
    token: string;
    SingIn: (data: LoginData) => Promise<void>;
    SingUp: (data: RegisterData) => Promise<void>;
    LogOut: () => Promise<void>;
}



const AuthContext = createContext<UserContextData>({} as UserContextData);
export const useUser = () => useContext(AuthContext);


export const UserProvider = ({ children }: UserProviderProps) => {
    const [token, setToken] = useState<string>(localStorage.getItem("@HanburgueKenzie-user") || "");
    const [user, setUser] = useState<User>({} as User);

    const SingIn = useCallback(async ({ email, password }: LoginData) => {
        await api.post("/login", { email, password }).then(response => {
            localStorage.setItem("@HanburgueKenzie-user", response.data.accessToken)
            setToken(response.data.accessToken);
            setUser(response.data.user as User);
        });
    }, []);

    const SingUp = useCallback(async ({ email, name, password }: RegisterData) => {
        await api.post("/users", { email, name, password });
    }, []);

    const LogOut = useCallback(async () => {
        setToken("");
        setUser({} as User);
        localStorage.clear();
    }, []);

    return (
        <AuthContext.Provider value={ { user, token, SingIn, SingUp, LogOut } }>
            { children }
        </AuthContext.Provider>
    );
};