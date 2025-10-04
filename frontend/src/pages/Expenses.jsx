import React from "react";
import { useExpenses } from "../context/ExpenseContext.jsx";

export default function Expenses() {
  const { expenses } = useExpenses();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Expenses</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td className="border px-4 py-2">{exp.date}</td>
              <td className="border px-4 py-2">{exp.category}</td>
              <td className="border px-4 py-2">{exp.amount}</td>
              <td className="border px-4 py-2">{exp.description}</td>
              <td className="border px-4 py-2">{exp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
