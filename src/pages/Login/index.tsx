import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import logoBgWhite from "../../assets/logo-bg-white.svg";
import { Input } from "../../components/Form/Input";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { signInSchema } from "../../schemas";

interface ISignInData {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const { signIn, loading, setLoading } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn: any = (data: ISignInData) => {
    setLoading(true);

    signIn(data)
      .then((_) => {
        setLoading(false);
        navigate("dashboard");
      })
      .catch((err) => setLoading(false));
  };

  return (
    <Flex
      padding={["10px 15px", "10px 15px", "0px", "0px"]}
      alignItems="center"
      justifyContent="center"
      height={["auto", "auto", "100vh", "100vh"]}
      bgGradient={[
        "linear(to-b, purple.800 65%, white 35%)",
        "linear(to-b, purple.800 65%, white 35%)",
        "linear(to-r, purple.800 65%, white 35%)",
        "linear(to-r, purple.800 65%, white 35%)",
      ]}
      color="white"
    >
      <Flex
        w={["100%", "100%", "90%", "65%"]}
        justifyContent="center"
        flexDirection={["column", "column", "row", "row"]}
        alignItems="center"
      >
        <Grid w={["100%", "100%", "50%", "50%"]} paddingRight="100px">
          <Image
            src={logoBgWhite}
            alt="do-it"
            boxSize={["120px", "120px", "150px", "150px"]}
          />
          <Heading mt="4" as="h1">
            O jeito fácil, grátis
          </Heading>
          <Text maxW="350px">
            Flexível e atrativo de gerenciar
            <b> seus projetos em uma única plataforma</b>
          </Text>
        </Grid>
        <Grid
          as="form"
          onSubmit={handleSubmit(handleSignIn)}
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
                icon={FaEnvelope}
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
              error={errors.password}
              type="password"
              icon={FaLock}
              {...register("password")}
            />
          </VStack>
          <VStack mt="4" spacing="5">
            <Button
              isLoading={loading}
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
            >
              Entrar
            </Button>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};
