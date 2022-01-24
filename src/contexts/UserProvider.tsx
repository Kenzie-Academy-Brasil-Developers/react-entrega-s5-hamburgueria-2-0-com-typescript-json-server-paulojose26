import { createContext, ReactNode, useCallback, useContext, useState } from "react";

import { api } from "../services/api";

interface UserProviderProps {
    children: ReactNode;
}
interface UserContextData{
    user: User;
    token: string;
    SingIn: (data: LoginData) => Promise<void>;
    SingUp: (data: RegisterData) => Promise<void>;
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


const AuthContext = createContext<UserContextData>({} as UserContextData);
export const useUser = () => useContext(AuthContext);


export const UserProvider = ({ children }: UserProviderProps) => {
    const [token, setToken] = useState<string>(localStorage.getItem("@HanburgueKenzie-user") || "");
    const [user, setUser] = useState<User>({} as User);

    const SingIn = useCallback(async (data: LoginData) => {
        await api.post("/login", data).then(response => {
            setToken(response.data.accessToken);
            setUser(response.data.user as User);
        });
    }, []);

    const SingUp = useCallback(async (data: RegisterData) => {
        await api.post("/users", data)
    }, []);

    return (
        <AuthContext.Provider value={ { user, token, SingIn, SingUp } }>
            { children }
        </AuthContext.Provider>
    );
};