import {
  FormControl, //Vê se deu erro ou não, faz efeitos visuais
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { useState, useEffect, useCallback, useRef } from "react";
import { IconType } from "react-icons/lib";

interface IInputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}

export const Input = ({
  name,
  icon: Icon,
  label,
  error = null,
  ...rest
}: IInputProps) => {
  return (
    <FormControl>
      {!!label && <FormLabel>Label</FormLabel>}

      <InputGroup flexDirection="column">
        {Icon && <InputLeftElement mt="2.5" children={<Icon />} />}

        <ChakraInput
          name={name}
          bg="gray.50"
          variant="outline"
          _hover={{ bgColor: "gray.100" }}
          _placeholder={{ color: "gray.300" }}
          size="lg"
          h="60px"
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};
