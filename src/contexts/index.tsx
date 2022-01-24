import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../style/theme";
import { UserProvider } from "./UserProvider";

interface ProvidersProps{
    children: ReactNode;
}


export const Providers = ({ children }: ProvidersProps) => {
    return (
        <UserProvider>
            <ChakraProvider theme={ theme }>{ children }</ChakraProvider>
        </UserProvider>
    );
};
