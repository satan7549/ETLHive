import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../utils/api";

const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem("token") || null,
  error: null,
  loading: false,
};

export const AuthProvider = ({ children }) => {
  const [initialStates, setInitialState] = useState(initialState);

  const signup = async (name, username, password) => {
    setInitialState((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }));
    try {
      const response = await axios.post(`${baseURL}/user/register`, {
        name,
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      setInitialState((prevState) => ({
        ...prevState,
        token,
        loading: false,
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Sign up failed";
      setInitialState((prevState) => ({
        ...prevState,
        error: errorMessage,
        loading: false,
      }));
    }
  };

  const login = async (username, password, captcha) => {
    setInitialState((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }));
    try {
      const response = await axios.post(`${baseURL}/user/login`, {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      setInitialState((prevState) => ({
        ...prevState,
        token,
        loading: false,
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      console.log(errorMessage);
      setInitialState((prevState) => ({
        ...prevState,
        error: errorMessage,
        loading: false,
      }));
    }
  };

  const passwordForgot = async ({ username, email }) => {
    setInitialState((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }));
    try {
      const response = await axios.post(`${baseURL}/user/forgot-password`, {
        username,
        email,
      });
      console.log(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Forgot Password failed";
      setInitialState((prevState) => ({
        ...prevState,
        error: errorMessage,
        loading: false,
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setInitialState((prevState) => ({
      ...prevState,
      token: null,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setInitialState((prevState) => ({
        ...prevState,
        token,
      }));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ initialStates, signup, login, logout, passwordForgot }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
