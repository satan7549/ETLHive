import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  VStack,
  Spinner,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Link,
} from "@chakra-ui/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../context/AuthContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const { login, loading, error } = useAuth();

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 3000,
      });
    }
  }, [error, toast]);

  const onCaptchaChange = (value) => {
    setCaptcha(value);
    setCaptchaVerified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified || !username || !password) {
      toast({
        title:
          (!username && "Username required") ||
          (!password && "Password required") ||
          (!captchaVerified && "Captcha verification required"),
        status: "error",
        duration: 3000,
      });
      return;
    }

    try {
      await login(username, password, captcha);
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
      });
    } catch {
      // Error handling is done in AuthProvider
    }
  };

  return (
    <Box p={4} maxW="md" shadow="md" mx="auto">
      <VStack spacing={4}>
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
              type={showPassword ? "text" : "password"} // Toggle input type
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
        <ReCAPTCHA
          sitekey="6LdvtyMqAAAAABHMs-0S28ipbDhUNcpWtL0Yo5po"
          onChange={onCaptchaChange}
        />
        <Text mt={4}>
          <Link as={RouterLink} to="/forgot-password" color="blue.600">
            Forgot Password?
          </Link>
        </Text>
        <Button colorScheme="teal" onClick={handleSubmit} isDisabled={loading}>
          {loading ? <Spinner size="sm" /> : "Login"}
        </Button>
        <Text mt={4}>
          New User?{" "}
          <Link as={RouterLink} to="/login" color="blue.600">
            Sign Up
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
