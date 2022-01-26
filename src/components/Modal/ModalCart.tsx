import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { RiSubtractFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

import { useCart } from "../../contexts/CartProvider";
import { theme } from "../../style/theme";

interface ModalCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalCart = ({ isOpen, onClose }: ModalCartProps) => {
  const { cart, deleteToCart, plusToCart, removeToCart } = useCart();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="white"
          bg="green.300"
          borderRadius="5px 5px 0 0"
        >
          <Heading as="h2" fontSize="lg">
            Carrinho de compras
          </Heading>
          <Center as="button" onClick={onClose}>
            <AiFillCloseCircle />
          </Center>
        </ModalHeader>
        {!!cart.length ? (
          <>
            <ModalBody padding="18px">
              {cart.map((item) => (
                <Flex
                  key={item.id}
                  flexDirection="row"
                  justifyContent="start"
                  alignItems="stretch"
                  position="relative"
                  mb="15px"
                >
                  <Center
                    as="button"
                    position="absolute"
                    top="7px"
                    right="15px"
                    fontSize="xl"
                    color="gray.300"
                    onClick={() => {
                      deleteToCart(item.id);
                    }}
                  >
                    <FaTrash />
                  </Center>
                  <Center
                    padding="15px 0"
                    bg="gray.100"
                    borderRadius="5px"
                    mr="10px"
                  >
                    <Image src={item.img} h="40px" />
                  </Center>
                  <Flex flexDirection="column" justifyContent="space-between">
                    <Heading as="h2" fontSize="lg">
                      Hamburguer
                    </Heading>
                    <Flex flexDirection="row">
                      { item.qtdProduct > 1 ? (
                        <Center
                          as="button"
                          fontSize="xl"
                          bg="gray.100"
                          padding="0 10px"
                          borderRadius="5px 0 0 5px"
                          onClick={ () => {
                            removeToCart(item);
                          }}
                        >
                          <RiSubtractFill color={theme.colors.gray["600"]} />
                        </Center>
                      ): (
                        <Center
                          as="button"
                          fontSize="xl"
                          bg="gray.100"
                          padding="0 10px"
                          borderRadius="5px 0 0 5px"
                          onClick={ () => {
                            deleteToCart(item.id);
                          }}
                        >
                          <FaTrash color={theme.colors.gray["600"]} />
                        </Center>
                      )}
                      <Text
                        padding="2px 25px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderTop="2px solid"
                        borderBottom="2px solid"
                        borderColor="gray.100"
                      >
                        { item.qtdProduct }
                      </Text>
                      <Center
                        as="button"
                        fontSize="xl"
                        bg="gray.100"
                        color="gray.300"
                        padding="0 10px"
                        borderRadius="0 5px 5px 0"
                        onClick={ () => {
                          plusToCart(item);
                        }}
                      >
                        <AiOutlinePlus color={theme.colors.gray["600"]} />
                      </Center>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </ModalBody>
            <Box
              border="1px solid"
              borderColor="gray.100"
              margin="0 18px"
            ></Box>
            <ModalFooter
              padding="18px"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="sm" fontWeight="bold">
                Total
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="gray.300">
                R${" "}
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.qtdProduct,
                    0
                  )
                  .toFixed(2)}
              </Text>
            </ModalFooter>
          </>
        ) : (
          <ModalBody
            padding="30px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading as="h2" fontSize="lg" mb="20px">
              Seu carrinho está vazio
            </Heading>
            <Text fontSize="sm" color="gray.300">
              Adicione itens
            </Text>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
