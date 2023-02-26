import { Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../schemas";
import { SignupInfo } from "./SignupInfo";
import { SignupForm } from "./SignupForm";
import { useState } from "react";
import { GoBackButton } from "./GoBackButton";
import { api } from "../../services/api";
import { ModalSuccess } from "../../components/Modal/ModalSuccess";
import { ModalError } from "../../components/Modal/ModalError";
import { useNavigate } from "react-router-dom";

export interface ISignup {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const Signup = () => {
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ISignup>({
    resolver: yupResolver(signupSchema),
  });

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onOpenModalSuccess,
    onClose: onCloseModalSuccess,
  } = useDisclosure();

  const {
    isOpen: isModalErrorOpen,
    onOpen: onOpenModalError,
    onClose: onCloseModalError,
  } = useDisclosure();

  const handleSignup = ({ email, name, password }: ISignup) => {
    setLoading(true);

    api
      .post("/register", { name, email, password })
      .then((res) => {
        setLoading(false);
        onOpenModalSuccess();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        onOpenModalError();
      });
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const navigate = useNavigate();

  return (
    <>
      <ModalSuccess
        buttonMessage="Ir para o login agora"
        message="Seu cadastro deu super certo, <b>vamos lá</b>"
        isOpen={isModalSuccessOpen}
        onClose={onCloseModalSuccess}
        onClick={() => navigate("/")}
        secondaryText="Você já pode começar criando <b>suas listas</b> de tarefas agora mesmo..."
      />
      <ModalError
        error="Seu email já está em uso"
        secondaryText="Você já pode tentar novamente, <b>clicando</b> no botão acima ou
        aguarde alguns minutos..."
        isOpen={isModalErrorOpen}
        onClose={onCloseModalError}
      />
      <Flex
        padding={["10px 15px", "10px 15px", "0px", "0px"]}
        alignItems="center"
        justifyContent="center"
        height={["auto", "auto", "100vh", "100vh"]}
        bgGradient={[
          "linear(to-b, purple.800 65%, white 35%)",
          "linear(to-b, purple.800 65%, white 35%)",
          "linear(to-l, purple.800 65%, white 35%)",
          "linear(to-l, purple.800 65%, white 35%)",
        ]}
        color="white"
      >
        <Flex
          w={["100%", "100%", "90%", "65%"]}
          justifyContent="center"
          flexDirection={["column", "column", "row", "row"]}
          alignItems="center"
        >
          {isWideVersion ? (
            <>
              <GoBackButton top="5" right="85vw" />
              <SignupForm
                errors={errors}
                handleSignup={handleSubmit(handleSignup)}
                loadingLogin={loading}
                register={register}
              />
              <SignupInfo />
            </>
          ) : (
            <>
              <GoBackButton top="10" right="15" />
              <SignupInfo />
              <SignupForm
                errors={errors}
                handleSignup={handleSubmit(handleSignup)}
                loadingLogin={loading}
                register={register}
              />
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
