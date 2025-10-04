<<<<<<< HEAD
// /frontend/src/components/Navbar.jsx

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left section - Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-600">
                            ExpenseManager
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">
                            Home
                        </Link>
                        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                            Dashboard
                        </Link>
                        <Link to="/expenses" className="text-gray-700 hover:text-blue-600">
                            Expenses
                        </Link>
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                            Signup
                        </Link>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 py-3 space-y-2">
                        <Link
                            to="/"
                            className="block text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/dashboard"
                            className="block text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/expenses"
                            className="block text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Expenses
                        </Link>
                        <Link
                            to="/login"
                            className="block px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="block px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
=======
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
>>>>>>> 826bd52 (Updated UI)
}

