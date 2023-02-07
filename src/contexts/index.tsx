import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { myTheme } from "../styles/theme";

interface IAppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProviderProps) => (
  <ChakraProvider theme={myTheme}>{children}</ChakraProvider>
);
