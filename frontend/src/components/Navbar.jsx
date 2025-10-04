<<<<<<< HEAD
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
=======
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);       // Mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // User dropdown

  // Dynamic greeting based on time
  const hours = new Date().getHours();
  let greeting = "Hello";
  if (hours < 12) greeting = "Good Morning";
  else if (hours < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section - Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
>>>>>>> 8f966c9 (Added middleware)
              ExpenseManager
            </Link>
          </div>

<<<<<<< HEAD
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
=======
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

            {/* User Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex flex-col items-center focus:outline-none group"
                >
                  {/* Greeting */}
                  <span className="text-sm text-gray-500 mb-1 group-hover:text-blue-600 transition-colors">
                    {greeting}
                  </span>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-2 transition-transform transform group-hover:scale-105">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border border-gray-300"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {user.name[0]}
                      </div>
                    )}
                    <span className="text-gray-700 font-medium">{user.name}</span>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                      to="/logout"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
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

            {/* Mobile user section */}
            {user ? (
              <>
                <div className="flex flex-col items-start px-4 py-2">
                  <span className="text-sm text-gray-500 mb-1">{greeting}</span>
                  <div className="flex items-center gap-2 mb-2">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border border-gray-300"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {user.name[0]}
                      </div>
                    )}
                    <span className="font-medium text-gray-700">{user.name}</span>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
>>>>>>> 8f966c9 (Added middleware)
                >
                  Login
                </Link>
                <Link
                  to="/signup"
<<<<<<< HEAD
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
=======
                  className="block px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
>>>>>>> 8f966c9 (Added middleware)
                >
                  Signup
                </Link>
              </>
            )}
<<<<<<< HEAD

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
=======
          </div>
        </div>
      )}
>>>>>>> 8f966c9 (Added middleware)
    </nav>
  );
}

