import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../style/theme";
import { AuthProvider } from "./AuthProvider";

interface ProvidersProps{
    children: ReactNode;
}


export const Providers = ({ children }: ProvidersProps) => {
    return (
        <AuthProvider>
            <ChakraProvider theme={ theme }>{ children }</ChakraProvider>
        </AuthProvider>
    );
};
