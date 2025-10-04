import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext.jsx";

export default function AddExpense() {
  const { addExpense } = useExpenses();
  const [form, setForm] = useState({ amount: "", category: "", description: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(form);
    setForm({ amount: "", category: "", description: "", date: "" });
    alert("Expense submitted!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}

