import React, { createContext, useContext, useState } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([
    // initial mock data
    { id: 1, user: "John Doe", amount: 100, category: "Travel", status: "Pending", date: "2025-10-04", description: "Taxi fare" },
  ]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { id: Date.now(), status: "Pending", ...expense }]);
  };

  const updateExpenseStatus = (id, status) => {
    setExpenses(
      expenses.map((exp) => (exp.id === id ? { ...exp, status } : exp))
    );
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, updateExpenseStatus }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
