import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Text,
} from "@chakra-ui/react";
import { useState, ForwardRefRenderFunction, forwardRef, useEffect } from "react";
import { FieldError } from "react-hook-form";

interface InputBaseProps extends ChakraInputProps {
  placeholder: string;
  error?: FieldError | null;
}
type inputVariationProps = {
  [key: string]: string;
};
const InputVariation: inputVariationProps = {
  error: "red.600",
  empty: "gray.100",
  filled: "green.400",
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputBaseProps> = (
  { placeholder, error = null, ...rest },
  ref
) => {
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [checkInput, setCheckInput] = useState<boolean>(false);
  const [borderValid, setBorderValid] = useState<string>("empty");

  useEffect(() => {
      if (error) {
          setBorderValid("error");
      }
      else if(checkInput){
          setBorderValid("filled");
      }
  }, [error]);

  return (
    <FormControl position="relative">
      <FormLabel
        zIndex="1"
        position="absolute"
        fontSize={focusInput || checkInput ? "xs" : "lg"}
        padding="0 2px"
        bg={focusInput || checkInput ? "white" : "transparent"}
        color="gray.300"
        top={focusInput || checkInput ? "-9px" : "9px"}
        transition="ease-in-out .1s"
        left="8px"
      >
        {placeholder}
      </FormLabel>
      <ChakraInput
        zIndex="0"
        h="45px"
        border="2px solid"
        borderColor={ InputVariation[borderValid] }
        bg={focusInput || checkInput ? "white" : "gray.100"}
        onChangeCapture={(e) => {
          if (e.currentTarget.value.length > 0) {
            setCheckInput(true);
          }
          else {
            setCheckInput(false);
            setBorderValid("empty");
          }
        }}
        onFocusCapture={() => {
          setFocusInput(true);
        }}
        onBlurCapture={() => {
          setFocusInput(false);
          if(error){
            setBorderValid("error");
          }
          else{
            if(checkInput)
                setBorderValid("filled");
          }
        }}
        _focus={{ zIndex: "0" }}
        _hover={ {  } }
        {...rest}
        ref={ref}
      />
      { !!error && <Text as="span" color="red.600" fontSize="xs">{error.message}</Text> }
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
