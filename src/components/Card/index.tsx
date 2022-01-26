import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import toast from "react-hot-toast";

import { useCart } from "../../contexts/CartProvider";
import { useUser } from "../../contexts/UserProvider";

interface CardProps {
  product: Product;
}
interface Product {
  id: string;
  img: string;
  name: string;
  type: string;
  price: number;
}

export const Card = ({ product }: CardProps) => {
  const { addToCart } = useCart();
  const { user } = useUser();

  const onClick = () => {
    addToCart(product, user.id).then(() => {
      toast.success("Adicionado ao carrinho");
    }).catch(() => {
      toast.error("Faça login para continuar");
    });
  }

  return (
    <Box border="2px solid" borderColor="gray.50" borderRadius="5px">
      <Center as="figure" width="100%" padding="15px 0" bg="gray.50">
        <Image src={product.img} alt={product.name} h="110px" />
      </Center>
      <Center as="figcaption" display="none">
        {product.name}
      </Center>
      <VStack padding="15px" spacing="12px" alignItems="flex-start">
        <Heading as="h2" fontSize="lg">
          {product.name}
        </Heading>
        <Text as="p" fontSize="xs" color="gray.300" fontWeight="bold">
          {product.type}
        </Text>
        <Text as="span" fontSize="sm" color="green.400">
          R$ {product.price.toFixed(2)}
        </Text>
        <Button
          bg="green.300"
          color="white"
          fontSize="md"
          _hover={{ bg: "green.50" }}
          onClick={ onClick }
        >
          Adicionar
        </Button>
      </VStack>
    </Box>
  );
};
