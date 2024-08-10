import React, { useState } from "react";
import axios from "axios";
import { useToast, Input, Button, Box } from "@chakra-ui/react";
import { baseURL } from "../utils/api";

const ForgotPasswordPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${baseURL}/user/forgot-password`, { username, email });
      toast({
        title: "Reset link sent.",
        description: "Please check your email for the reset link.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error.",
        description: error.response?.data?.message || "An error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={4} borderWidth={1} borderRadius="md">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          mb={3}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={3}
        />
        <Button
          type="submit"
          colorScheme="teal"
          isLoading={loading}
          width="full"
        >
          Send Reset Link
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPasswordPage;
