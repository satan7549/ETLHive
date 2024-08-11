import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { resetPassword, initialStates } = useAuth();
  const { resetPasswordSuccess, error, loading } = initialStates;

  useEffect(() => {
    if (resetPasswordSuccess) {
      toast({
        title: "Password reset successful.",
        description: "You can now log in with your new password.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (error) {
      toast({
        title: "Error.",
        description: error || "An error occurred.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [resetPasswordSuccess, error, toast, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !password) {
      toast({
        title:
          (!token && "token required") || (!password && "password required"),
        status: "error",
        duration: 3000,
      });
      return;
    }
    await resetPassword(token, password);
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
        {resetPasswordSuccess ? (
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={loading}
            width="full"
            size="lg"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        ) : null}
      </VStack>
    </Box>
  );
};

export default ResetPasswordPage;
