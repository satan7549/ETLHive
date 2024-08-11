import "./App.css";
import { Box } from "@chakra-ui/react";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  // Define the routes where the Navbar should be hidden
  const hideNavbarRoutes = ["/reset-password/:token"];

  // Check if the current path matches any of the hideNavbarRoutes
  const hideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.includes(route.replace(":token", ""))
  );

  return (
    <Box>
      {!hideNavbar && <Navbar />}
      <AllRoutes />
    </Box>
  );
}

export default App;
