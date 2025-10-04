import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      {/* Left side - Logo / Home */}
      <div>
        <Link className="font-bold text-lg" to="/dashboard">ExpenseMgmt</Link>
      </div>

      {/* Right side - Navigation Links */}
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/add-expense">Add Expense</Link>
            {user.role === "Manager" && <Link to="/approvals">Approvals</Link>}
            {user.role === "Admin" && <Link to="/users">User Management</Link>}
            <Link to="/reports">Reports</Link>
            <button onClick={logout} className="bg-red-500 px-2 py-1 rounded ml-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
