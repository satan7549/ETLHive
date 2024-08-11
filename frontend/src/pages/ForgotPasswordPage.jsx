import React, { useEffect, useState } from "react";
import { useToast, Input, Button, Box } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const ForgotPasswordPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { passwordForgot, initialStates } = useAuth();
  const { forgotPassword, error, loading } = initialStates;
  const toast = useToast();

  useEffect(() => {
    if (forgotPassword) {
      toast({
        title: "Reset link sent.",
        description: "Please check your email for the reset link.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else if (error) {
      toast({
        title: "Error.",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [forgotPassword, error, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email) {
      toast({
        title:
          (!username && "Username required") || (!email && "email required"),
        status: "error",
        duration: 3000,
      });
      return;
    }

    await passwordForgot({ username, email });
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
