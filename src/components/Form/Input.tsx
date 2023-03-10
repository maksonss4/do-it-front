import {
  FormControl, //Vê se deu erro ou não, faz efeitos visuais
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import {
  useState,
  useEffect,
  useCallback,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { IconType } from "react-icons/lib";

interface IInputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?:
    | FieldError
    | Partial<{
        type: string | number;
        message: string;
      }>
    | undefined;
  iconLeaft?: IconType;
  iconRight?: IconType;
  handleClickIconRight?: () => void;
}

type inputVariationOptions = {
  [key: string]: string;
};

const inputVariation: inputVariationOptions = {
  error: "red.500",
  default: "gray.200",
  focus: "purple.800",
  filled: "green.600",
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  {
    name,
    iconLeaft: IconLeaft,
    iconRight: IconRight,
    handleClickIconRight,
    label,
    error = undefined,
    ...rest
  },
  ref
) => {
  const [variation, setVariation] = useState("default");

  const [value, setValue] = useState("");

  useEffect(() => {
    if (error) {
      return setVariation("error");
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    if (!error) {
      setVariation("focus");
    }
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation("filled");
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel color="gray.400">{label}</FormLabel>}

      <InputGroup flexDirection="column">
        {IconLeaft && (
          <InputLeftElement
            color={inputVariation[variation]}
            mt="2.5"
            children={<IconLeaft />}
          />
        )}
        {IconRight && (
          <InputRightElement
            mt="2.5"
            children={
              <Button
                padding="0"
                bgColor="transparent"
                _hover={{ bgColor: "transparent" }}
                h="20px"
                onClick={handleClickIconRight}
              >
                <IconRight />
              </Button>
            }
          />
        )}

        <ChakraInput
          name={name}
          bg="gray.50"
          color={inputVariation[variation]}
          borderColor={inputVariation[variation]}
          onFocus={handleInputFocus}
          onBlurCapture={handleInputBlur}
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
          variant="outline"
          _hover={{ bgColor: "gray.100" }}
          _placeholder={{ color: "gray.300" }}
          _focus={{ bg: "gray.100" }}
          ref={ref}
          size="lg"
          h="60px"
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
