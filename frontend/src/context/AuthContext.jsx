import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { baseURL } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (name, username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseURL}/user/register`, {
        name,
        username,
        password,
      });
      setToken(response.data.token);
    } catch (error) {
      setError(error.response?.data?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password, captcha) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseURL}/user/login`, {
        username,
        password,
      });
      setToken(response.data.token);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const passwordForgot = async ({ username, email }) => {
    try {
      const response = await axios.post(`${baseURL}/user/forgot-password`, {
        username,
        email,
      });
      console.log(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, signup, login, logout, loading, error, passwordForgot }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
