import { Center, Flex, Heading, Image, useDisclosure } from "@chakra-ui/react";
import { FaTh } from "react-icons/fa";
import LogoMin from "../../assets/logo-min.svg";
import { myTheme } from "../../styles/theme";
import { Menu } from "./Menu";

export const Header = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Flex
      borderBottom="1px"
      borderBottomColor="#f5f5f5"
      paddingX="8"
      paddingY="2"
      as="header"
      justifyContent="space-between"
      alignItems={["unset", "center"]}
    >
      <Flex
        align={["flex-start", "center"]}
        gap="4"
        flexDir={["column", "row"]}
      >
        <Image src={LogoMin} />
        <Heading size="lg">Dashboard</Heading>
      </Flex>
      <Center onClick={onToggle} as="button" fontSize="2rem" h="max-content">
        <FaTh color={myTheme.colors.gray[300]} />
      </Center>
      <Menu isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
