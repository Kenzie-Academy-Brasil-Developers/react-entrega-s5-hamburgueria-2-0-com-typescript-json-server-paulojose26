import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiShoppingBag } from "react-icons/fi";
import toast from "react-hot-toast";

import { Input } from "../../components/Form/Input";
import { useUser } from "../../contexts/UserProvider";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}



export const Register = () => {
  const { SingUp } = useUser();

  const loginSchema = yup.object().shape({
    name: yup.string().required("* Campo Obrigatório"),
    email: yup
      .string()
      .required("* Campo Obrigatório")
      .email("* E-mail Inválido"),
    password: yup.string().required("* Campo Obrigatório").min(6, "Mínimo de 6 caracteres"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "* Senhas diferentes"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<RegisterData>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = (data: RegisterData) => {
    SingUp(data).then(() => {
      reset();
      toast.success("Cadastro Realizado !");
    }).catch(() => {
      toast.error("Esse email já está sendo utilizado");
    });
  };

  return (
    <Flex
      onSubmit={handleSubmit(handleLogin)}
      as="main"
      w="100%"
      h="100vh"
      padding="20px"
      flexDirection={["column", "column", "row"]}
      justifyContent={["start", "start", "space-evenly"]}
      alignItems="center"
    >
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
        <Box display="flex" justifyContent="space-between">
          <Heading as="h2" fontSize="lg">
            Cadastro
          </Heading>
          <Link
            as={RouteLink}
            to="/login"
            color="gray.300"
            fontSize="sm"
            borderBottom="1px solid"
            _hover={{}}
          >
            Retornar para o login
          </Link>
        </Box>
        <VStack mt="20px" spacing="15px">
          <Input
            type="text"
            placeholder="Nome"
            error={errors.name}
            {...register("name")}
          />
          <Input
            type="email"
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
          <Input
            type="password"
            placeholder="Confirme a senha"
            error={errors.confirm_password}
            {...register("confirm_password")}
          />
        </VStack>
        <Button
          type="submit"
          mt="15px"
          h="45px"
          w="100%"
          bg="gray.50"
          color="gray.300"
          fontSize="md"
          _hover={{ bg: "gray.300", color: "gray.50" }}
        >
          Cadastrar
        </Button>
      </Flex>
    </Flex>
  );
};
