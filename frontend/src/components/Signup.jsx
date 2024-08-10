// import React from 'react'

// const Signup = () => {
//   return (
//     <div>Signup</div>
//   )
// }

// export default Signup

import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(name, username, password);
      toast({
        title: "Sign up successful",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box p={4} maxW="md" shadow="md" mx="auto">
      <VStack spacing={4}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
};

export default SignUp;
