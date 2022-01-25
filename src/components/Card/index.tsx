import { Box, Center, Image } from "@chakra-ui/react";

interface CardProps {
  product: Product;
}
interface Product {
  id: string;
  img: string;
  name: string;
  price: number;
}

export const Card = ({ product }: CardProps) => {
  return (
    <Box border="2px solid" borderColor="gray.50" borderRadius="5px">
      <Center as="figure" width="100%" padding="15px 0" bg="gray.50">
        <Image src={ product.img } alt={ product.name } h="100" />
      </Center>
      <Center as="figcaption" display="none">{ product.name }</Center>
    </Box>
  );
};
