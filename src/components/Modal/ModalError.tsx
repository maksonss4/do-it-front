import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FaExclamation, FaTimes } from "react-icons/fa";
import { myTheme } from "../../styles/theme";

interface IModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
  secondaryText: string;
}

export const ModalError = ({
  isOpen,
  onClose,
  error,
  secondaryText,
}: IModalErrorProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color="gray.800">
        <ModalHeader display="flex">
          <Center bg="red.600" w="30px" h="30px" borderRadius="5px">
            <FaExclamation color={myTheme.colors.white} />
          </Center>
          <Text fontWeight="bold" ml="2">
            Oops!
          </Text>
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
        </ModalHeader>

        <ModalBody textAlign="center" color="gray.400">
          <Text>
            Ocorreu algum erro! <b>{error}</b>
          </Text>
        </ModalBody>

        <ModalFooter flexDirection="column">
          <Button
            bg="red.600"
            color="white"
            w="100%"
            h="60px"
            _hover={{ bg: "red.700" }}
            onClick={onClose}
          >
            Tentar novamente
          </Button>
          <Text textAlign="center" mt="4">
            <Box
              as="span"
              dangerouslySetInnerHTML={{ __html: secondaryText }}
            />
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
