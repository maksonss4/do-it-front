import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { ISignup } from ".";
import { Input } from "../../components/Form/Input";

interface ISignupForm {
  handleSignup: () => void;
  errors: FieldErrors<ISignup>;
  register: UseFormRegister<ISignup>;
  loadingLogin: boolean;
}

export const SignupForm = ({
  handleSignup,
  errors,
  register,
  loadingLogin,
}: ISignupForm) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Grid
      as="form"
      onSubmit={handleSignup}
      mt={["4", "4", "0"]}
      w={["95%", "95%", "40%", "40%"]}
      padding="10px 25px"
      border="3px solid"
      borderColor="gray.100"
      bg="white"
      color="gray.900"
    >
      <Heading size="lg">Crie sua conta</Heading>
      <VStack mt="6" spacing="3">
        <Input
          placeholder="Digite seu nome"
          iconLeaft={FaUser}
          label="Nome"
          error={errors.name}
          {...register("name")}
        />
        <Box w="100%">
          <Input
            placeholder="Digite seu email"
            iconLeaft={FaEnvelope}
            label="Email"
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
          label="Senha"
          placeholder="Digite sua senha"
          error={errors.password}
          type={showPassword ? "text" : "password"}
          iconLeaft={FaLock}
          {...register("password")}
          handleClickIconRight={handleClickPassword}
          iconRight={showPassword ? FaEyeSlash : FaEye}
        />
        <Input
          label="Confirmação de senha"
          placeholder="confirme sua senha sua senha"
          error={errors.confirm_password}
          type={showConfirmPassword ? "text" : "password"}
          iconLeaft={FaLock}
          {...register("confirm_password")}
          handleClickIconRight={handleClickConfirmPassword}
          iconRight={showConfirmPassword ? FaEyeSlash : FaEye}
        />
      </VStack>

      <Button
        isLoading={loadingLogin}
        bg="purple.800"
        mt="4"
        w="100%"
        color="white"
        h="60px"
        borderRadius="8px"
        _hover={{ background: "purple.900" }}
        type="submit"
      >
        Finalizar cadastro
      </Button>
    </Grid>
  );
};
