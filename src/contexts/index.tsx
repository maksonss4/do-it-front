import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { myTheme } from "../styles/theme";
import { AuthProvider } from "./AuthContext";
import { TaskProvider } from "./TasksContext";

interface IAppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProviderProps) => (
  <AuthProvider>
    <TaskProvider>
      <ChakraProvider theme={myTheme}>{children}</ChakraProvider>
    </TaskProvider>
  </AuthProvider>
);
