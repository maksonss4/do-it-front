import { Box, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { CardSkeleton } from "../../components/Skeleton/CardSkeleton";
import { useTasks } from "../../contexts/TasksContext";

export const NotResult = () => {
  const { taskNotFound } = useTasks();

  return (
    <Center
      px="25px"
      mt="4"
      textAlign="center"
      display="flex"
      flexDirection="column"
    >
      <Heading size="lg">Não encontramos resultados para: </Heading>
      <Text fontSize="xl" color="gray.300" fontWeight="bold">
        {taskNotFound}
      </Text>
      <Box mt="6" w="100%" maxW="500px" padding="6" boxShadow="base" bg="white">
        <Stack w="100%">
          <CardSkeleton
            repeatCount={1}
            height="20px"
            borderRadius="20px"
            w="80%"
          />
          <CardSkeleton
            repeatCount={1}
            height="20px"
            borderRadius="20px"
            w="60%"
          />
        </Stack>
        <Stack mt="20px">
          <CardSkeleton repeatCount={2} height="15px" borderRadius="20px" />
        </Stack>
      </Box>
    </Center>
  );
};
