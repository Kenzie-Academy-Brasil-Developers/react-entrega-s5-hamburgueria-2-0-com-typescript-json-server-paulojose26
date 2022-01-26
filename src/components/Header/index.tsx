import { Box, Center, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

import { Search } from "../Form/Search";
import { useUser } from "../../contexts/UserProvider";
import { useCart } from "../../contexts/CartProvider";
import { ModalCart } from "../Modal/ModalCart";

export const Header = () => {
  const { token, LogOut } = useUser();
  const { cart } = useCart();

  const history = useHistory();

  const { isOpen, onClose, onOpen } = useDisclosure();


  return (
    <Flex
      as="header"
      w="100%"
      h="12vh"
      justifyContent="space-around"
      alignItems="center"
      bg="gray.50"
    >
      <ModalCart isOpen={ isOpen } onClose={ onClose } />
      <Box display="flex" justifyContent="center" alignContent="center">
        <Heading as="h1" fontSize={["xl", "2xl"]}>
          Burguer{" "}
          <Text as="span" fontSize={["lg", "xl"]} color="red.500">
            Kenzie
          </Text>
        </Heading>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Center
          display={["none", "none", "flex"]}
          position={["absolute", "absolute", "static"]}
        >
          <Search />
        </Center>
        <Center
          display={["flex", "flex", "none"]}
          padding={["static", "static", "absolute"]}
          as="button"
          fontSize="xl"
          ml={["10px", "20px"]}
          color="gray.300"
        >
          <FaSearch />
        </Center>
        <Center
          as="button"
          fontSize="xl"
          ml={["10px", "20px"]}
          color="gray.300"
          position="relative"
          onClick={ () => {
            if(!!token){
              onOpen();
            }
            else{
              toast.error("Faça login para continuar");
            }
          }}
        >
            <Text
              position="absolute"
              as="span"
              padding="0"
              bg="green.300"
              top="-7px"
              left="12px"
              w="15px"
              h="15px"
              fontSize="12px"
              color="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="2px"
            >
              { cart.reduce((total, item) => total + item.qtdProduct, 0) }
            </Text>
          <FaShoppingCart />
        </Center>
        {!!token ? (
          <Center
            as="button"
            ml="20px"
            fontSize="xl"
            color="gray.300"
            onClick={() => LogOut()}
          >
            <FiLogOut />
          </Center>
        ) : (
          <Center
            as="button"
            ml={["10px", "20px"]}
            fontSize="xl"
            color="gray.300"
            onClick={() => history.push("/login")}
          >
            <FiLogIn />
          </Center>
        )}
      </Box>
    </Flex>
  );
};
