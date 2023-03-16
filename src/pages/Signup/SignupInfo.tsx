import LogoBgWhite from "../../assets/logo-bg-white.svg";
import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaForward, FaHandHolding } from "react-icons/fa";
import { myTheme } from "../../styles/theme";

export const SignupInfo = () => {
  return (
    <Grid w={["100%", "100%", "50%", "50%"]} paddingLeft={["0", "0", "150px"]}>
      <Image
        src={LogoBgWhite}
        alt="do-it"
        boxSize={["120px", "120px", "150px", "150px"]}
      />
      <VStack
        padding={["5px", "10px", "0"]}
        spacing={["10px", "10px", "14px"]}
        mt={["15px", "0"]}
      >
        <Flex w="100%">
          <Center borderRadius="5px" bg="white" minW="50px" h="50px">
            <FaForward color={myTheme.colors.purple["800"]} size="25" />
          </Center>
          <Box ml="4">
            <Heading size="lg"> Agilidade</Heading>
            <Text>Agilize seus projetos com rapidez e muita performance</Text>
          </Box>
        </Flex>
        <Flex w="100%">
          <Center borderRadius="5px" bg="white" minW="50px" h="50px">
            <FaHandHolding color={myTheme.colors.purple["800"]} size="25" />
          </Center>
          <Box ml="4">
            <Heading size="lg"> Simplicidade</Heading>
            <Text>
              Armazene seus projetos e atividades em uma interface altamente
              usual
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Grid>
  );
};
