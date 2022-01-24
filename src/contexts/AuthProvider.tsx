import { createContext, ReactNode, useContext } from "react";

interface AuthProviderProps {
    children: ReactNode;
}


const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: AuthProviderProps) => {
    return (
        <AuthContext.Provider value={ { } }>
            { children }
        </AuthContext.Provider>
    );
};