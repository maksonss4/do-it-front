import { Grid } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { CardSkeleton } from "../../components/Skeleton/CardSkeleton";
import { useTasks } from "../../contexts/TasksContext";

interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
}

interface ITaskListProps {
  handleClick: (task: ITask) => void;
  loading: boolean;
}

export const TasksList = ({ handleClick, loading }: ITaskListProps) => {
  const { tasks } = useTasks();

  return (
    <Grid
      w="100%"
      gap={10}
      paddingX="8"
      mt="8"
      display="flex"
      flexDir="row"
      flexWrap="wrap"
      justifyContent={["center", "center", "unset"]}
      paddingBottom="20px"
    >
      {loading ? (
        <CardSkeleton repeatCount={9} w="100%" maxW="400px" />
      ) : (
        tasks.map((task) => (
          <Card onClick={handleClick} key={task.id} task={task} />
        ))
      )}
    </Grid>
  );
};
