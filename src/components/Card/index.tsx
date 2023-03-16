import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Progress,
  Text,
} from "@chakra-ui/react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";
import { myTheme } from "../../styles/theme";
import { dateUppercase } from "../../utils";

interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
}

interface ICardProps {
  task: ITask;
  onClick: (task: ITask) => void;
}

export const Card = ({ task, onClick }: ICardProps) => {
  const { deleteTask, updateTask } = useTasks();
  const { accessToken, user } = useAuth();

  return (
    <Box
      cursor="pointer"
      _hover={{ transform: "translateY(-7px)", borderColor: "gray.100" }}
      transition="border 0.2s, ease 0s, transform 0.2s"
      borderWidth="1px"
      borderColor="gray.50"
      boxShadow="base"
      padding="7"
      w="100%"
      maxW="400px"
    >
      <Flex justify="space-between">
        <Heading as="h1" size="md" paddingRight="10px">
          {task.title}
        </Heading>
        <HStack spacing="4">
          <Center
            as="button"
            w="30px"
            h="30px"
            borderWidth="1px"
            borderRadius="5px"
            borderColor="gray.200"
            bgColor="white"
            onClick={() => deleteTask(task.id, accessToken)}
          >
            <FaTrash color={myTheme.colors.gray[300]} />
          </Center>
          <Center
            as="button"
            w="30px"
            h="30px"
            borderWidth="1px"
            borderRadius="5px"
            borderColor="gray.200"
            bgColor="white"
            onClick={() => updateTask(task.id, user.id, accessToken)}
          >
            <FaCheck color={myTheme.colors.gray[300]} />
          </Center>
        </HStack>
      </Flex>

      <Box onClick={() => onClick(task)} w="100%" mt="4">
        <Text>{task.description}</Text>
        <Progress
          colorScheme="purple"
          mt="2.5"
          value={task.completed ? 100 : 10}
        />
        <Text color="gray.200" mt="3">
          {dateUppercase(task.created_at)}
        </Text>
      </Box>
    </Box>
  );
};
