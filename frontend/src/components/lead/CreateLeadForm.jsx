import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useLead } from "../../context/LeadContext";

const CreateLeadForm = ({ onClose }) => {
  const { createLead, state } = useLead();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [product, setProduct] = useState("");
  const toast = useToast();
  const { leadCreated, loading, error } = state;

  useEffect(() => {
    if (leadCreated) {
      toast({
        title: "Lead created successfully.",
        status: "success",
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
  }, [leadCreated, error, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !number) {
      toast({
        title:
          (!name && "Name required") ||
          (!email && "Eamil required") ||
          (!number && "Number required"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const lead = {
      email,
      name,
      number,
      product: product.split(","),
    };

    await createLead(lead);

    // Reset form fields
    setEmail("");
    setName("");
    setNumber("");
    setProduct("");

    // Close the modal
    if (onClose) onClose();
  };

  return (
    <Box p={4} maxW="md" shadow="md" mx="auto">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            isRequired
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            isRequired
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="number">
          <FormLabel>Number</FormLabel>
          <Input
            isRequired
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </FormControl>
        <FormControl id="product">
          <FormLabel>Product (comma separated)</FormLabel>
          <Input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" type="submit" isDisabled={loading}>
          {loading ? <Spinner size="sm" /> : "Create Lead"}
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateLeadForm;
