import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../schemas";
import { SignupInfo } from "./SignupInfo";
import { SignupForm } from "./SignupForm";
import { useState } from "react";

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

  const handleSignup = (data: ISignup) => {
    console.log(data);
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
        <SignupForm
          errors={errors}
          handleSignup={handleSubmit(handleSignup)}
          loadingLogin={loading}
          register={register}
        />
        <SignupInfo />
      </Flex>
    </Flex>
  );
};
