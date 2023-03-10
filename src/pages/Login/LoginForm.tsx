import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Form/Input";

interface ILoginFormProps {
  handleSignIn: () => void;
  errors: FieldErrors<ISignIn>;
  register: UseFormRegister<ISignIn>;
  loadingLogin: boolean;
}

export interface ISignIn {
  email: string;
  password: string;
}

export const LoginForm = ({
  handleSignIn,
  errors,
  register,
  loadingLogin,
}: ILoginFormProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  return (
    <Grid
      as="form"
      onSubmit={handleSignIn}
      mt={["4", "4", "0"]}
      w={["95%", "95%", "40%", "40%"]}
      padding="30px 15px"
      border="3px solid"
      borderColor="gray.100"
      bg="white"
      color="gray.900"
    >
      <Heading size="lg">Bem vindo de volta!</Heading>
      <VStack mt="6" spacing="5">
        <Box w="100%">
          <Input
            placeholder="Digite seu login"
            iconLeaft={FaEnvelope}
            label="Login"
            error={errors.email}
            {...register("email")}
          />
          {!errors.email && (
            <Text ml="1" mt="1" color="gray.300">
              Exemplo: nome@email.com
            </Text>
          )}
        </Box>
        <Input
          placeholder="Digite sua senha"
          iconLeaft={FaLock}
          label={"Senha"}
          error={errors.password}
          type={show ? "text" : "password"}
          {...register("password")}
          iconRight={show ? FaEyeSlash : FaEye}
          handleClickIconRight={handleClick}
        />
      </VStack>
      <VStack mt="4" spacing="5">
        <Button
          isLoading={loadingLogin}
          bg="purple.800"
          w="100%"
          color="white"
          h="60px"
          borderRadius="8px"
          _hover={{ background: "purple.900" }}
          type="submit"
        >
          Entrar
        </Button>
        <Text color="gray.400">Ainda não possui uma conta?</Text>
        <Button
          bg="gray.100"
          w="100%"
          color="gray.300"
          h="60px"
          borderRadius="8px"
          _hover={{ background: "gray.200" }}
          onClick={() => navigate("/signup")}
        >
          Cadastrar
        </Button>
      </VStack>
    </Grid>
  );
};
