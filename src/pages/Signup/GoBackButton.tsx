import { Center } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { myTheme } from "../../styles/theme";

interface IGoBackButtonProps {
  top: string;
  right: string;
}

export const GoBackButton = ({ right, top }: IGoBackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Center
      as="button"
      position="absolute"
      top={top}
      right={right}
      backgroundColor="purple.500"
      fontSize="2xl"
      borderRadius="md"
      w={["60px", "80px"]}
      h="40px"
      _hover={{
        bg: "purple.600",
      }}
      onClick={() => navigate("/")}
    >
      <FaArrowLeft color={myTheme.colors.white} />
    </Center>
  );
};
