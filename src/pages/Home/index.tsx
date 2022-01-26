import { Box, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Card } from "../../components/Card";

import { Header } from "../../components/Header";
import { useCart } from "../../contexts/CartProvider";
import { useProduct } from "../../contexts/ProductProvider";
import { useUser } from "../../contexts/UserProvider";


export const Home = () => {
    const { products, getProducts } = useProduct();
    const { getCart } = useCart();
    const { getUser, user } = useUser();

    useEffect(() => {
        getProducts().catch(() => {
            toast.error("Produtos não encontrado, tente novamente mais tarde");
        });
        getUser();
    }, []);

    useEffect(() => {
        getCart(user.id);
    }, [user]);

    return (
        <Box as="main" w="100%" h="100vh" >
            <Header />
            <Grid
                w="100%"
                templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                gap={7}
                padding={["10px 10px", "10px 30px","30px 7vw"]}
            >
                { products.map(item => (
                    <Card key={ item.id } product={ item } />
                ))}
            </Grid>
        </Box>
    );
};
