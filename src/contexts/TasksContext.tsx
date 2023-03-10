import { AxiosResponse } from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../services/api";
import * as uuid from "uuid";

interface ITaskProviderProps {
  children: ReactNode;
}

interface ITask {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
  created_at: Date;
}

interface ITaskContextData {
  tasks: ITask[];
  createTask: (data: Omit<ITask, "id">, accessToken: string) => Promise<void>;
  loadTasks: (userId: string, accessToken: string) => Promise<void>;
  deleteTask: (taskId: string, accessToken: string) => Promise<void>;
  updateTask: (
    taskId: string,
    userId: string,
    accessToken: string
  ) => Promise<void>;
  searchTask: (taskTitle: string, accessToken: string) => Promise<void>;
  notFound: boolean;
  taskNotFound: string;
}

const TaskContext = createContext({} as ITaskContextData);

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within an TaskProvider");
  }

  return context;
};

export const TaskProvider = ({ children }: ITaskProviderProps) => {
  const [tasks, setTasks] = useState([] as ITask[]);
  const [notFound, setNotFound] = useState(false);
  const [taskNotFound, setTaskNotFound] = useState("");

  const loadTasks = useCallback(async (userId: string, accessToken: string) => {
    try {
      const response = await api.get(`/tasks?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setTasks(response.data);
    } catch (err) {
      setTasks([]);
    }
  }, []);

  const createTask = useCallback(
    async (data: Omit<ITask, "id">, accessToken: string) => {
      const id = uuid.v4();
      api
        .post(
          "/tasks",
          { ...data, id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res: AxiosResponse<ITask>) =>
          setTasks((oldTasks) => [...oldTasks, res.data])
        )
        .catch((err) => console.log(err));
    },
    []
  );

  const deleteTask = useCallback(
    async (taskId: string, accessToken: string) => {
      await api
        .delete(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_) => {
          const filteredTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(filteredTasks);
        })
        .catch((err) => console.log(err));
    },
    [tasks]
  );

  const searchTask = useCallback(
    async (taskTitle: string, accessToken: string) => {
      const response = await api.get(`/tasks?title_like=${taskTitle}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.data.length) {
        setTaskNotFound(taskTitle);
        setNotFound(true);
      } else {
        setNotFound(false);
        setTasks(response.data);
      }
    },
    []
  );

  const updateTask = useCallback(
    async (taskId: string, userId: string, accessToken: string) => {
      await api
        .patch(
          `/tasks/${taskId}`,
          { completed: true, userId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => {
          const filteredTasks = tasks.filter((task) => task.id !== taskId);
          const task = tasks.find((task) => taskId === task.id);
          if (task) {
            task.completed = true;
            setTasks([...filteredTasks, task]);
          }
        })
        .catch((err) => console.log(err));
    },
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        loadTasks,
        deleteTask,
        updateTask,
        searchTask,
        notFound,
        taskNotFound,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
