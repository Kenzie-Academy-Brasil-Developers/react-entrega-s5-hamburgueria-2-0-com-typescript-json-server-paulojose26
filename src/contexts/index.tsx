import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../style/theme";
import { UserProvider } from "./UserProvider";
import { ProductProvider } from "./ProductProvider";
import { CartProvider } from "./CartProvider";

interface ProvidersProps{
    children: ReactNode;
}



export const Providers = ({ children }: ProvidersProps) => {
    return (
        <UserProvider>
            <ProductProvider>
                <CartProvider>
                    <ChakraProvider theme={ theme }>{ children }</ChakraProvider>
                </CartProvider>
            </ProductProvider>
        </UserProvider>
    );
};
