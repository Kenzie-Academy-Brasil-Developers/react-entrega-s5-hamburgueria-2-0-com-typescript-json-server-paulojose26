import { FormControl, Input, InputRightElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export const Search = () => {
  return (
    <FormControl>
      <Input bg="white" placeholder="Digitar pesquisa" />
      <InputRightElement
        color="white"
        bg="green.400"
        mt="5px"
        mr="5px"
        w="40px"
        h="30px"
        borderRadius="10px"
        cursor="pointer"
      >
        <FiSearch />
      </InputRightElement>
    </FormControl>
  );
};
