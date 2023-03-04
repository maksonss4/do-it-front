import { Button, Center, Flex, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";
import { myTheme } from "../../styles/theme";
import { ModalCreateTask } from "../Modal/ModalCreateTask";
import { Input } from "./Input";

interface ISearchBoxData {
  title: string;
}

export const SearchBox = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { searchTask } = useTasks();
  const { accessToken } = useAuth();

  const handleSearchBox = ({ title }: ISearchBoxData) => {
    searchTask(title, accessToken);
  };

  const { register, handleSubmit } = useForm<ISearchBoxData>();

  return (
    <>
      <ModalCreateTask isOpen={isOpen} onClose={onClose} />
      <Flex
        mt="6"
        w="100%"
        paddingX={["4", "8"]}
        paddingY="2"
        paddingBottom="6"
        borderBottomWidth="1px"
        borderColor="gray.50"
        flexDir={["column", "column", "row", "row"]}
      >
        <Flex as="form" onSubmit={handleSubmit(handleSearchBox)}>
          <Input
            placeholder="Pesquisar por tarefa"
            w={["100%", "100%", "35vw"]}
            {...register("title")}
          />
          <Center
            borderRadius="8px"
            as="button"
            ml="2"
            w="65px"
            h="60px"
            fontSize="2xl"
            bg="purple.600"
          >
            <FaSearch color={myTheme.colors.white} />
          </Center>
        </Flex>
        <Button
          bg="purple.500"
          color="white"
          ml={["0", "0", "4"]}
          h="max-content"
          paddingY="20px"
          borderRadius="8px"
          onClick={onOpen}
          mt={["4", "4", "8"]}
          _hover={{ bg: "purple.600" }}
          whiteSpace="pre-wrap"
        >
          Adicionar uma nova tarefa
        </Button>
      </Flex>
    </>
  );
};
