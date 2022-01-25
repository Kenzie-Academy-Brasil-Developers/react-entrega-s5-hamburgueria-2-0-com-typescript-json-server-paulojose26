import { createContext, ReactNode, useCallback, useContext, useState } from "react";

import { api } from "../services/api";

interface ProductContextData {
    products: Product[];
    getProducts: () => Promise<void>;
}
interface ProductProviderProps {
    children: ReactNode;
}
interface Product{
    id: string;
    img: string;
    name: string;
    price: number;
}



const ProductContext = createContext<ProductContextData>({} as ProductContextData);
export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }: ProductProviderProps) => {
    const [products, setProducts] = useState<Product[]>([] as Product[]);

    const getProducts = useCallback(async () => {
        api.get("/products").then(response => {
            setProducts(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <ProductContext.Provider value={{products, getProducts}}>
            { children }
        </ProductContext.Provider>
    );
};