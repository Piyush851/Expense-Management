import React from "react";
import { useExpenses } from "../context/ExpenseContext.jsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function SimpleDashboard() {
  const { expenses } = useExpenses();

  // KPI calculations
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const pending = expenses.filter((e) => e.status === "Pending").length;
  const approved = expenses.filter((e) => e.status === "Approved").length;
  const rejected = expenses.filter((e) => e.status === "Rejected").length;
  const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  // Category aggregation
  const categoryMap = {};
  expenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
  });

  // Monthly trend data
  const monthlyData = {};
  expenses.forEach((e) => {
    const month = e.date.substring(0, 7); // YYYY-MM
    monthlyData[month] = (monthlyData[month] || 0) + e.amount;
  });
  const sortedMonths = Object.keys(monthlyData).sort();

  // Chart configurations
  const barData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "Amount per Category",
        data: Object.values(categoryMap),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(251, 146, 60, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  };

  const lineData = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Monthly Expenses",
        data: sortedMonths.map((m) => monthlyData[m]),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const doughnutData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [approved, pending, rejected],
        backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          font: { size: 11 },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
      },
    },
  };

  const lineOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Expense Dashboard</h1>
        <p className="text-slate-600">Overview of company expenses and analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600 text-sm font-medium">Total Expenses</span>
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
              $
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">${totalExpenses.toLocaleString()}</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% vs last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600 text-sm font-medium">Pending</span>
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-lg">
              ⏱
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{pending}</p>
          <p className="text-xs text-slate-500 mt-1">Awaiting approval</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600 text-sm font-medium">Approved</span>
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
              ✓
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{approved}</p>
          <p className="text-xs text-slate-500 mt-1">{expenses.length > 0 ? ((approved / expenses.length) * 100).toFixed(0) : 0}% of total</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600 text-sm font-medium">Rejected</span>
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
              ✕
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{rejected}</p>
          <p className="text-xs text-slate-500 mt-1">{expenses.length > 0 ? ((rejected / expenses.length) * 100).toFixed(0) : 0}% of total</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600 text-sm font-medium">Avg Expense</span>
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
              📊
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">${avgExpense.toFixed(0)}</p>
          <p className="text-xs text-slate-500 mt-1">Per transaction</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Line Chart - Spanning 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Monthly Expense Trend</h3>
          <div style={{ height: "300px" }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Status Distribution</h3>
          <div style={{ height: "300px" }}>
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Bar Chart and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Expenses by Category</h3>
          <div style={{ height: "320px" }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Recent Expenses Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Expenses</h3>
          {expenses.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No expenses available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 text-xs font-semibold text-slate-600 uppercase">Employee</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-slate-600 uppercase">Category</th>
                    <th className="text-right py-3 px-2 text-xs font-semibold text-slate-600 uppercase">Amount</th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-slate-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.slice(-5).reverse().map((e) => (
                    <tr key={e.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-2 text-sm text-slate-700">{e.user}</td>
                      <td className="py-3 px-2 text-sm text-slate-600">{e.category}</td>
                      <td className="py-3 px-2 text-sm font-semibold text-slate-800 text-right">${e.amount}</td>
                      <td className="py-3 px-2 text-center">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            e.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : e.status === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
