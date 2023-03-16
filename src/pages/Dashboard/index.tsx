import { Box, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { ModalTaskDetail } from "../../components/Modal/ModalTaskDetail";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";
import { FirstTask } from "./FirstTask";
import { NotResult } from "./NotResult";
import { TasksList } from "./TasksList";

interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { tasks, loadTasks, notFound } = useTasks();
  const { user, accessToken } = useAuth();
  const [selectedTask, setSelectedTask] = useState<ITask>({} as ITask);

  const {
    isOpen: isOpenModalTaskDetail,
    onOpen: onOpenModalTaskDetail,
    onClose: onCloseModalTaskDetail,
  } = useDisclosure();

  useEffect(() => {
    loadTasks(user.id, accessToken).then(() => setLoading(false));
  }, [accessToken, loadTasks, user.id]);

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
      <Header />
      <Box>
        {!loading && !tasks.length ? (
          <>
            <FirstTask />
          </>
        ) : (
          <>
            <SearchBox />
            {notFound ? (
              <NotResult />
            ) : (
              <TasksList loading={loading} handleClick={handleClick} />
            )}
          </>
        )}
      </Box>
    </>
  );
};
