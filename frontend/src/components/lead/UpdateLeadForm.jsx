import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useLead } from "../../context/LeadContext";

const UpdateLeadForm = ({ lead, onClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [product, setProduct] = useState("");
  const { updateLead, state } = useLead();
  const { error, leadUpdated } = state;
  const toast = useToast();

  useEffect(() => {
    // Initialize form fields with lead data, if available
    if (lead) {
      setEmail(lead.email || "");
      setName(lead.name || "");
      setNumber(lead.number || "");
      setProduct(lead.product ? lead.product.join(",") : "");
    }
  }, [lead]);

  useEffect(() => {
    if (leadUpdated) {
      toast({
        title: "Lead update successfully.",
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
  }, [leadUpdated, error, toast]);

  const handleUpdate = async () => {
    // Prepare updated lead data
    const updatedData = {
      email,
      name,
      number,
      product: product.split(",").map((p) => p.trim()),
    };

    // Create a new object excluding disallowed fields
    const { _id, createdAt, __v, ...leadData } = lead;

    // Combine the updated data with existing data excluding the unwanted fields
    const updatedLead = { ...leadData, ...updatedData };

    await updateLead(_id, updatedLead);
    onClose();
  };

  return (
    <Box>
      <FormControl mb="4">
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Number</FormLabel>
        <Input value={number} onChange={(e) => setNumber(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Product</FormLabel>
        <Input value={product} onChange={(e) => setProduct(e.target.value)} />
      </FormControl>
      <Button colorScheme="blue" mr="4" onClick={handleUpdate}>
        Save
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </Box>
  );
};

export default UpdateLeadForm;
