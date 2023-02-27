import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea as ChakraTextArea,
  TextareaProps as ChakraTextAreaProps,
  InputLeftElement,
  InputGroup,
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

interface ITextAreaProps extends ChakraTextAreaProps {
  name: string;
  label?: string;
  error?:
    | FieldError
    | Partial<{
        type: string | number;
        message: string;
      }>
    | undefined;
  icon?: IconType;
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

const TextAreaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  ITextAreaProps
> = ({ name, icon: Icon, label, error = undefined, ...rest }, ref) => {
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
        {Icon && (
          <InputLeftElement
            color={inputVariation[variation]}
            mt="2.5"
            children={<Icon />}
          />
        )}

        <ChakraTextArea
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

export const TextArea = forwardRef(TextAreaBase);
