import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { ModalTaskDetail } from "../../components/Modal/ModalTaskDetail";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";

interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { tasks, loadTasks } = useTasks();
  const { user, accessToken } = useAuth();
  const [selectedTask, setSelectedTask] = useState<ITask>({} as ITask);

  const {
    isOpen: isOpenModalTaskDetail,
    onOpen: onOpenModalTaskDetail,
    onClose: onCloseModalTaskDetail,
  } = useDisclosure();

  useEffect(() => {
    loadTasks(user.id, accessToken).then(() => setLoading(false));
  }, []);

  const handleClick = (task: ITask) => {
    setSelectedTask(task);
    onOpenModalTaskDetail();
  };

  return (
    <>
      <ModalTaskDetail
        isOpen={isOpenModalTaskDetail}
        onClose={onCloseModalTaskDetail}
        task={selectedTask}
      />
      <Box>
        <Header />
        <SearchBox />
        <Grid
          w="100%"
          templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
          gap={10}
          paddingX="8"
          mt="8"
        >
          {tasks.map((task) => (
            <Card onClick={handleClick} key={task.id} task={task} />
          ))}
        </Grid>
      </Box>
    </>
  );
};
