import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useExpenses } from "../context/ExpenseContext.jsx";

export default function Expenses() {
  const { user } = useAuth();
  const { expenses } = useExpenses();

  const myExpenses =
    user.role === "Employee"
      ? expenses.filter((e) => e.user === user.name)
      : expenses;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>
      {myExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Employee</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Manager</th>
              </tr>
            </thead>
            <tbody>
              {myExpenses.map((e) => (
                <tr key={e.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{e.user}</td>
                  <td className="border px-4 py-2">{e.category}</td>
                  <td className="border px-4 py-2">{e.amount}</td>
                  <td className="border px-4 py-2">{e.date}</td>
                  <td className="border px-4 py-2">{e.status}</td>
                  <td className="border px-4 py-2">{e.manager || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

