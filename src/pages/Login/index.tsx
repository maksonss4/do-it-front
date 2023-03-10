import { Flex, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../schemas";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginInfo } from "./LoginInfo";
import { LoginForm } from "./LoginForm";
import { useState } from "react";
import { ModalError } from "../../components/Modal/ModalError";

interface ISignIn {
  email: string;
  password: string;
}

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ISignIn>({
    resolver: yupResolver(signInSchema),
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleSignIn = (data: ISignIn) => {
    setLoading(true);

    signIn(data)
      .then((_) => {
        setLoading(false);
        const toNavigate = location.state?.from?.pathname || "dashboard";
        navigate(toNavigate);
      })
      .catch(() => {
        setLoading(false);
        onOpen();
      });
  };

  return (
    <>
      <ModalError
        isOpen={isOpen}
        onClose={onClose}
        error="Email ou senha incorretos."
        secondaryText="Certifique-se de ter digitado email e senha corretamente."
      />
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
          <LoginInfo />
          <LoginForm
            errors={errors}
            handleSignIn={handleSubmit(handleSignIn)}
            loadingLogin={loading}
            register={register}
          />
        </Flex>
      </Flex>
    </>
  );
};
