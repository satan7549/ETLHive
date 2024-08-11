import React, { useEffect } from "react";
import {
  Button,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import CreateLeadForm from "../components/lead/CreateLeadForm";
import LeadList from "../components/lead/LeadList";
import { useLead } from "../context/LeadContext";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { fetchLeads } = useLead();

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <>
      <Box p="4">
        <Button onClick={onOpen} colorScheme="teal" mb="4">
          Add New Lead
        </Button>
        <LeadList />
      </Box>

      {/* Create Lead Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Lead</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateLeadForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
