import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // logged-in user

  // localStorage से user load करें
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Signup - mock (frontend-only)
  const signup = (name, email, password, role = "Employee") => {
    // normally backend API call here
    const newUser = { id: Date.now(), name, email, role };
    localStorage.setItem("signupUser", JSON.stringify(newUser));
    alert("Signup successful! Please login.");
    return true;
  };

  // Login - mock
  const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem("signupUser"));
    if (savedUser && savedUser.email === email) {
      setUser(savedUser);
      localStorage.setItem("user", JSON.stringify(savedUser));
      return true;
    } else {
      alert("Invalid credentials or signup first");
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

