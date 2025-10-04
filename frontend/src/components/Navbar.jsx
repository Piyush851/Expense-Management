import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold hover:text-gray-300">
              ExpenseManager
            </Link>
          </div>

          {/* Links */}
          <div className="flex space-x-4 items-center">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  to="/add-expense"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md"
                >
                  Add Expense
                </Link>
                <Link
                  to="/expenses"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md"
                >
                  Expenses
                </Link>
                {user.role === "Manager" && (
                  <Link
                    to="/approvals"
                    className="hover:bg-gray-700 px-3 py-2 rounded-md"
                  >
                    Approvals
                  </Link>
                )}
                {user.role === "Admin" && (
                  <Link
                    to="/users"
                    className="hover:bg-gray-700 px-3 py-2 rounded-md"
                  >
                    Users
                  </Link>
                )}
                <Link
                  to="/reports"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md"
                >
                  Reports
                </Link>
              </>
            )}

            {/* Auth Buttons */}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
                >
                  Signup
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
              >
                Logout ({user.name})
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

