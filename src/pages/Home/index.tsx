import { Box, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Card } from "../../components/Card";

import { Header } from "../../components/Header";
import { useProduct } from "../../contexts/ProductProvider";


export const Home = () => {
    const { products, getProducts } = useProduct();

    useEffect(() => {
        getProducts().catch(() => {
            toast.error("Produtos não encontrado, tente novamente mais tarde");
        });
    }, [getProducts]);

    return (
        <Box as="main" w="100%" h="100vh">
            <Header />
            <Grid
                w="100%"
                templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                gap={7}
                padding={["5px 10px", "5px 30px","20px 7vw"]}
                mt="8"
            >
                { products.map(item => (
                    <Card key={ item.id } product={ item } />
                ))}
            </Grid>
        </Box>
    );
};
