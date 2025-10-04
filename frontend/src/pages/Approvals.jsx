import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useExpenses } from "../context/ExpenseContext.jsx";

export default function Approvals() {
  const { user } = useAuth();
  const { expenses, setExpenses } = useExpenses();

  if (user.role !== "Manager") {
    return <p className="p-6 text-red-500 font-bold">Access Denied: Managers only</p>;
  }

  // Pending expenses assigned to this manager
  const pendingExpenses = expenses.filter(
    e => e.status === "Pending" && e.manager === user.name
  );

  const handleApproval = (id, status) => {
    const updatedExpenses = expenses.map(e =>
      e.id === id ? { ...e, status } : e
    );
    setExpenses(updatedExpenses);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pending Approvals</h1>

      {pendingExpenses.length === 0 ? (
        <p>No pending expenses.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Employee</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingExpenses.map(e => (
              <tr key={e.id}>
                <td className="border px-4 py-2">{e.user}</td>
                <td className="border px-4 py-2">{e.category}</td>
                <td className="border px-4 py-2">{e.amount}</td>
                <td className="border px-4 py-2">{e.description}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleApproval(e.id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleApproval(e.id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

