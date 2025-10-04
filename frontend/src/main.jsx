import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ExpenseProvider } from "./context/ExpenseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </AuthProvider>
  </React.StrictMode>
);
