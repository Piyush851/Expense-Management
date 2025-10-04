import React from "react";
import { useExpenses } from "../context/ExpenseContext.jsx";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

export default function Reports() {
  const { expenses } = useExpenses();

  // Summary counts
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const pendingCount = expenses.filter(e => e.status === "Pending").length;
  const approvedCount = expenses.filter(e => e.status === "Approved").length;
  const rejectedCount = expenses.filter(e => e.status === "Rejected").length;

  // Category-wise totals
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  // Pie chart data
  const statusData = [
    { name: "Pending", value: pendingCount },
    { name: "Approved", value: approvedCount },
    { name: "Rejected", value: rejectedCount },
  ];

  const COLORS = ["#FFBB28", "#00C49F", "#FF8042"];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Expense Reports</h1>

      {/* Summary Cards */}
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

      {/* Category-wise Table */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Expenses by Category</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(categoryTotals).map(([cat, amt]) => (
              <tr key={cat}>
                <td className="border px-4 py-2">{cat}</td>
                <td className="border px-4 py-2">{amt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Pie Chart */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Expenses Status Chart</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}
