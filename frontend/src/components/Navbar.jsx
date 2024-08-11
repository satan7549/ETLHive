import {
  Box,
  Button,
  Flex,
  Spacer,
  useBreakpointValue,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { logout, initialStates } = useAuth();
  const { token } = initialStates;

  const isDesktop = useBreakpointValue({ base: false, md: true });

  // Use color mode values for consistent theming
  const bgColor = useColorModeValue("teal.500", "teal.600");
  const menuBgColor = useColorModeValue("teal.500", "teal.700");
  const hoverBgColor = useColorModeValue("teal.600", "teal.800");
  const textColor = useColorModeValue("white", "gray.200");

  return (
    <Box p={4} bg={bgColor} color={textColor}>
      <Flex align="center">
        <Link to="/">
          <Button variant="link" color={textColor}>
            Home
          </Button>
        </Link>
        <Spacer />
        {isDesktop ? (
          <>
            {token ? (
              <Button color={textColor} onClick={logout} variant="outline">
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button color={textColor} variant="outline" mr={4}>
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button color={textColor} variant="outline">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              color={textColor}
              _hover={{ bg: hoverBgColor }}
              _active={{ bg: hoverBgColor }}
            />
            <MenuList bg={menuBgColor} borderColor={hoverBgColor}>
              {token ? (
                <MenuItem
                  color={textColor}
                  _hover={{ bg: hoverBgColor }}
                  _focus={{ bg: hoverBgColor }}
                  onClick={logout}
                >
                  Logout
                </MenuItem>
              ) : (
                <>
                  <MenuItem
                    color={textColor}
                    bg={bgColor}
                    _hover={{ bg: hoverBgColor }}
                    _focus={{ bg: hoverBgColor }}
                    as={Link}
                    to="/login"
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    color={textColor}
                    bg={bgColor}
                    _hover={{ bg: hoverBgColor }}
                    _focus={{ bg: hoverBgColor }}
                    as={Link}
                    to="/signup"
                  >
                    Sign Up
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
