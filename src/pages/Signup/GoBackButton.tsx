import { Center } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { myTheme } from "../../styles/theme";

export const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <Center
      as="button"
      position="absolute"
      top={["30px", "30px", "15px", "60px"]}
      right={["15px", "15px"]}
      left={["unset", "unset", "75px"]}
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
