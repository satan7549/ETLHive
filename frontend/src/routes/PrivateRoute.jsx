import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { initialStates } = useAuth();
  const { token } = initialStates;

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
