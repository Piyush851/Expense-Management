import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/auth/";

export const signup = async (userData) => {
  const response = await axios.post(API_URL + "signup", userData);
  // Always save user
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};
