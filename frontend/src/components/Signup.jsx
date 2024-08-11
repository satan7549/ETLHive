import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  useToast,
  Spinner,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { signup, initialStates } = useAuth();
  const { token, error, loading } = initialStates;

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 3000,
      });
    } else if (token) {
      toast({
        title: "Sign up successful",
        status: "success",
        duration: 3000,
      });
      navigate("/"); // Redirect to home page or desired page
    }
  }, [error, token, toast, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !password) {
      toast({
        title:
          (!name && "Name required") ||
          (!username && "Username required") ||
          (!password && "Password required"),
        status: "error",
        duration: 3000,
      });
      return;
    }

    await signup(name, username, password);
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
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                variant="link"
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit} isDisabled={loading}>
          {loading ? <Spinner size="sm" /> : "Sign Up"}
        </Button>
        <Text mt={4}>
          Already have an account?{" "}
          <Link as={RouterLink} to="/login" color="blue.600">
            Login
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default SignUp;
