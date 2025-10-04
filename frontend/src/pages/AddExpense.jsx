import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useExpenses } from "../context/ExpenseContext.jsx";

export default function AddExpense() {
  const { user } = useAuth();
  const { addExpense } = useExpenses();

  const [form, setForm] = useState({
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.description || !form.date) {
      alert("Please fill all fields!");
      return;
    }

    addExpense({
      user: user.name,
      category: form.category,
      amount: parseFloat(form.amount),
      description: form.description,
      date: form.date,
      manager: user.manager || "",
    });

    setForm({ category: "", amount: "", description: "", date: "" });
    alert("Expense submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Add New Expense</h1>
          <p className="text-slate-600">Submit your expense for approval</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select a category</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food & Meals</option>
                <option value="Office">Office Supplies</option>
                <option value="Equipment">Equipment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Provide details about this expense..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows="4"
                className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              Submit Expense
            </button>
          </form>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <span className="mr-2">💡</span> Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Include receipts and detailed descriptions for faster approval</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Expenses are typically reviewed within 2-3 business days</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>You can track your submission status in the Expenses tab</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}