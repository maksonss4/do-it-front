import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
} from "@chakra-ui/react";
import { FaCheck, FaCube, FaTimes, FaTrash } from "react-icons/fa";
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

interface IModalTaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: ITask;
}

export const ModalTaskDetail = ({
  isOpen,
  onClose,
  task,
}: IModalTaskDetailProps) => {
  const { accessToken, user } = useAuth();
  const { deleteTask, updateTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task.id, accessToken);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding="2" bg="white" color="gray.800">
        <ModalHeader display="flex" justifyContent="space-between">
          <Flex>
            <Center bg="purple.500" w="30px" h="30px" borderRadius="5px">
              <FaCube color={myTheme.colors.white} />
            </Center>
            <Text fontWeight="bold" ml="2">
              Visualizar
            </Text>
          </Flex>
          <HStack spacing="2">
            <Center
              as="button"
              w="30px"
              h="30px"
              borderWidth="1px"
              borderRadius="5px"
              borderColor="gray.200"
              bgColor="white"
              onClick={handleDelete}
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
            <Center
              onClick={onClose}
              as="button"
              ml="auto"
              w="32px"
              h="32px"
              bg="red.600"
              fontSize="lg"
              borderRadius="md"
              _hover={{ bg: "red.700" }}
            >
              <FaTimes color={myTheme.colors.white} />
            </Center>
          </HStack>
        </ModalHeader>

        <ModalBody>
          <Heading as="h1" fontSize="2xl">
            {task.title}
          </Heading>
          <Text color="gray.400">{task.description}</Text>
        </ModalBody>

        <Box padding="6">
          <Progress colorScheme="purple" value={task.completed ? 100 : 10} />
          <Text color="gray.200" mt="3">
            {dateUppercase(task.created_at)}
          </Text>
        </Box>
      </ModalContent>
    </Modal>
  );
};
