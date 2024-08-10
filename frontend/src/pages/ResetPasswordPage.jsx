import React, { useState } from "react";
import axios from "axios";
import {
  useToast,
  Input,
  Button,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { baseURL } from "../utils/api";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${baseURL}/user/reset-password/${token}`, { password });
      toast({
        title: "Password reset successful.",
        description: "You can now log in with your new password.",
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
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <VStack spacing={4}>
        <Heading as="h2" size="lg">
          Reset Your Password
        </Heading>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                focusBorderColor="teal.500"
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
          <Button
            mt={4}
            type="submit"
            colorScheme="teal"
            isLoading={loading}
            width="full"
            size="lg"
          >
            Reset Password
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default ResetPasswordPage;
