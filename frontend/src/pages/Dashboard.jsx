import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useExpenses } from "../context/ExpenseContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const { expenses } = useExpenses();

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const pendingCount = expenses.filter(e => e.status === "Pending").length;
  const approvedCount = expenses.filter(e => e.status === "Approved").length;
  const rejectedCount = expenses.filter(e => e.status === "Rejected").length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>

      {/* Quick Links */}
      <div className="flex space-x-4 mb-6">
        <Link to="/add-expense" className="bg-blue-500 text-white px-4 py-2 rounded">Add Expense</Link>
        <Link to="/expenses" className="bg-green-500 text-white px-4 py-2 rounded">View Expenses</Link>
        {user.role === "Manager" && (
          <Link to="/approvals" className="bg-yellow-500 text-white px-4 py-2 rounded">Approvals</Link>
        )}
        {user.role === "Admin" && (
          <Link to="/users" className="bg-purple-500 text-white px-4 py-2 rounded">User Management</Link>
        )}
      </div>

      {/* Summary / Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Total Expenses</p>
          <p className="text-2xl font-bold">{totalExpenses}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Pending</p>
          <p className="text-2xl font-bold">{pendingCount}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Approved</p>
          <p className="text-2xl font-bold">{approvedCount}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Rejected</p>
          <p className="text-2xl font-bold">{rejectedCount}</p>
        </div>
      </div>

      {/* Recent Expenses Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Employee</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.slice(-5).reverse().map(exp => (
              <tr key={exp.id}>
                <td className="border px-4 py-2">{exp.user}</td>
                <td className="border px-4 py-2">{exp.category}</td>
                <td className="border px-4 py-2">{exp.amount}</td>
                <td className="border px-4 py-2">{exp.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

