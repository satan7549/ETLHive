import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import { LoginPage } from "../pages/LoginPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default AllRoutes;
