import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  theme,
} from "@chakra-ui/react";
import { FaExclamation } from "react-icons/fa";

interface IModalSuccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSuccess = ({ isOpen, onClose }: IModalSuccessProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <FaExclamation color={theme.colors.red["500"]} /> Oops!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Ocorreu algum erro!</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="red.500"
            color="white"
            w="100%"
            _hover={{ bg: "red.600" }}
            onClick={onClose}
          >
            Tentar Novamente
          </Button>
          <Text>
            Você já pode tentar novamente, clicando no botão acima ou aguarde
            alguns minutos...
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
