import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Spinner size="xl" />
      <Text mt="4" fontSize="lg" color="gray.600">
        {message}
      </Text>
    </Box>
  );
};

export default Loading;
