import {
  Box,
  Button,
  Flex,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, initialStates } = useAuth();
  const { token } = initialStates;

  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Box p={4} bg="teal.500" color="white">
      <Flex align="center">
        <Link to="/">
          <Button variant="link" colorScheme="whiteAlpha">
            Home
          </Button>
        </Link>
        <Spacer />
        {isDesktop && (
          <>
            <Link to="/leads">
              <Button variant="link" colorScheme="whiteAlpha">
                Leads
              </Button>
            </Link>
            {token ? (
              <Button colorScheme="whiteAlpha" onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button colorScheme="whiteAlpha">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button colorScheme="whiteAlpha">Sign Up</Button>
                </Link>
              </>
            )}
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
