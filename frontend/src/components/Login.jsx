// import React from 'react'

// const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login

import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const toast = useToast();
  const { login } = useAuth();

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
      
    } catch (error) {
      toast({
        title: "Login failed",
        status: "error",
        duration: 3000,
      });
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
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <ReCAPTCHA
          sitekey="6LdvtyMqAAAAABHMs-0S28ipbDhUNcpWtL0Yo5po"
          onChange={onCaptchaChange}
        />
        <Button colorScheme="teal" onClick={handleSubmit}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
