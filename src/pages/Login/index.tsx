import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiShoppingBag } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

import { Input } from "../../components/Form/Input";
import { useUser } from "../../contexts/UserProvider";

interface LoginData {
  email: string;
  password: string;
}



export const Login = () => {
  const { SingIn } = useUser();
  const history = useHistory();

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .required("* Campo Obrigatório")
      .email("* E-mail Inválido"),
    password: yup.string().required("* Campo Obrigatório"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = (data: LoginData) => {
    SingIn(data).then(() => {
      history.push("/");
    }).catch(() => {
      toast.error("E-mail e/ou senha está/ão errado(s)");
    });
  };

  return (
    <Flex
      onSubmit={handleSubmit(handleLogin)}
      as="main"
      w="100%"
      h="100vh"
      padding="20px"
      flexDirection={["column-reverse", "column-reverse", "row"]}
      justifyContent={["start", "start", "space-evenly"]}
      alignItems="center"
    >
      <Flex
        as="form"
        w={["100%", "80%", "40%"]}
        mt="4"
        flexDirection="column"
        alignItems="stretch"
        bg="white"
        action="post"
        autoComplete="off"
        padding="15px"
        border="2px solid"
        borderColor="gray.50"
        borderRadius="5px"
      >
        <Heading as="h2" fontSize="lg">
          Login
        </Heading>
        <VStack mt="20px" spacing="15px">
          <Input
            type="text"
            placeholder="E-mail"
            error={errors.email}
            {...register("email")}
          />
          <Input
            type="password"
            placeholder="Senha"
            error={errors.password}
            {...register("password")}
          />
        </VStack>
        <VStack mt="15px" spacing="13px">
          <Button
            type="submit"
            h="45px"
            w="100%"
            bg="green.300"
            color="white"
            fontSize="md"
            _hover={{ bg: "green.50" }}
          >
            Logar
          </Button>
          <Text fontSize="sm" textAlign="center" color="gray.300">
            Crie sua conta para saborear muitas delícias
            <br /> e matar sua fome!
          </Text>
          <Button
            type="button"
            h="45px"
            w="100%"
            bg="gray.50"
            color="gray.300"
            fontSize="md"
            _hover={{ bg: "gray.300", color: "gray.50" }}
            onClick={() => history.push("/register")}
          >
            Cadastrar
          </Button>
        </VStack>
      </Flex>
      <Box>
        <Heading as="h1" fontSize="3xl" mb="20px">
          Burguer{" "}
          <Text as="span" fontSize="2xl" color="red.500">
            Kenzie
          </Text>
        </Heading>
        <Flex
          padding="15px"
          border="2px solid"
          justifyContent="space-between"
          borderColor="gray.50"
          alignItems="center"
        >
          <Center
            w="60px"
            h="60px"
            bg="rgb(231, 245, 212)"
            color="green.400"
            fontSize="2xl"
            borderRadius="5px"
            mr="15px"
          >
            <FiShoppingBag />
          </Center>
          <Text color="gray.300" fontSize="sm" w={["70%", "270px"]}>
            A vida é como um sanduíche, é preciso recheá-la com os{" "}
            <b>melhores</b> ingredientes.
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
