import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import { ModalCreateTask } from "../../components/Modal/ModalCreateTask";

export const FirstTask = () => {
  const {
    isOpen: isOpenModalCreateTask,
    onOpen: onOpenModalCreateTask,
    onClose: onCloseModalCreateTask,
  } = useDisclosure();

  return (
    <>
      <ModalCreateTask
        isOpen={isOpenModalCreateTask}
        onClose={onCloseModalCreateTask}
      />
      <Box p="25px">
        <Box
          paddingY="16"
          paddingX="4px"
          justifyContent="center"
          textAlign="center"
          borderWidth="2px"
          borderColor="gray.200"
          borderStyle="dashed"
        >
          <Center fontSize="5xl">
            <FaClipboard color="#bdbdbd" />
          </Center>
          <Heading fontSize="2xl" as="h1" mt="4">
            Vamos criar sua primeira tarefa
          </Heading>
          <Text color="gray.400" mt="6">
            Insira sua meta e mostre a você mesmo
            <br /> sua capacidade em cumprir{" "}
            <Text as="span" fontWeight="bold" color="gray.900">
              suas atividades
            </Text>
          </Text>
          <Button
            padding="6"
            mt="6"
            bgColor="purple.800"
            color="white"
            _hover={{ bg: "purple.900" }}
            onClick={onOpenModalCreateTask}
            whiteSpace="pre-wrap"
          >
            Criar sua primeira tarefa
          </Button>
        </Box>
      </Box>
    </>
  );
};
