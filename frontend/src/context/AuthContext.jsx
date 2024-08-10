import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const signup = async (name, username, password) => {
    try {
       await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          name,
          username,
          password,
        }
      );
      setToken(token);
    } catch (error) {
      console.error("Sign failed", error);
    }
  };

  const login = async (username, password, captcha) => {
    try {
      console.log(username, password, "in cotext");
      const token = "sjnsdijios";
      //   const response = await axios.post(
      //     "http://localhost:8080/api/auth/login",
      //     {
      //       username,
      //       password,
      //       captcha,
      //     }
      //   )
      setToken(token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    console.log("logout");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
