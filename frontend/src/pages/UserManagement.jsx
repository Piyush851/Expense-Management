import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState([
    // mock initial data
    { id: 1, name: "John Doe", email: "john@example.com", role: "Employee", manager: "Manager1" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Manager", manager: "" },
  ]);

  const [form, setForm] = useState({ name: "", email: "", role: "Employee", manager: "" });

  if (user.role !== "Admin") {
    return <p className="p-6 text-red-500 font-bold">Access Denied: Admins only</p>;
  }

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers([...users, { id: Date.now(), ...form }]);
    setForm({ name: "", email: "", role: "Employee", manager: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} className="space-y-4 max-w-md mb-6">
        <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border px-3 py-2 rounded" required />
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border px-3 py-2 rounded" required />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full border px-3 py-2 rounded">
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
        </select>
        {form.role === "Employee" && (
          <select value={form.manager} onChange={e => setForm({ ...form, manager: e.target.value })} className="w-full border px-3 py-2 rounded">
            <option value="">Select Manager</option>
            {users.filter(u => u.role === "Manager").map(m => (
              <option key={m.id} value={m.name}>{m.name}</option>
            ))}
          </select>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Add User</button>
      </form>

      {/* Users Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Manager</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.role}</td>
              <td className="border px-4 py-2">{u.manager || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
