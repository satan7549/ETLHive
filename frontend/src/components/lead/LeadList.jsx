import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Text,
  Input,
  Grid,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import UpdateLeadForm from "./UpdateLeadForm";
import { useLead } from "../../context/LeadContext";
import Loading from "../Loading";

const LeadList = () => {
  const { state, deleteLead, searchLeads, sortLeads } = useLead();
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLead, setSelectedLead] = useState(null);
  const toast = useToast();

  const { leads, error, leadDeleted, loading } = state;

  useEffect(() => {
    if (searchQuery === "") {
      searchLeads(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (leadDeleted) {
      toast({
        title: "Lead deleted successfully.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else if (error) {
      toast({
        title: "Failed to create lead.",
        description: error || "An error occurred while creating the lead.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [leadDeleted, error, toast]);

  const handleSearch = () => {
    searchLeads(searchQuery);
  };

  const handleUpdateClick = (lead) => {
    setSelectedLead(lead);
    onOpen();
  };

  // Use useBreakpointValue to adjust the number of columns based on screen size
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  return (
    <Box p="4">
      <Box
        mb="4"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        gap="4"
      >
        <Input
          placeholder="Search leads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          flex="1"
        />
        <Button onClick={handleSearch} colorScheme="teal">
          Search
        </Button>
      </Box>
      <Button
        onClick={() => sortLeads(state.sortKey)}
        colorScheme="teal"
        mb="4"
      >
        Sort by {state.sortKey}
      </Button>

      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns={`repeat(${columns}, 1fr)`} gap="4">
          {leads.map((lead) => (
            <Box
              key={lead._id}
              p="4"
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              bg="white"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box mb="4">
                <Text fontWeight="bold">Email: {lead.email}</Text>
                <Text>Name: {lead.name}</Text>
                <Text>Number: {lead.number}</Text>
                <Text>
                  Product:{" "}
                  {Array.isArray(lead.product)
                    ? lead.product.join(", ")
                    : "N/A"}
                </Text>
              </Box>
              <Box mt="auto" display="flex" justifyContent="space-between">
                <Button onClick={() => deleteLead(lead._id)} colorScheme="red">
                  Delete
                </Button>
                <Button
                  onClick={() => handleUpdateClick(lead)}
                  colorScheme="blue"
                >
                  Update
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
      )}

      {/* Update Lead Modal */}
      {selectedLead && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Lead</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateLeadForm lead={selectedLead} onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default LeadList;
