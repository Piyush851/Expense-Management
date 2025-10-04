// /frontend/src/components/Footer.jsx

import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">

                    {/* Left side - Brand */}
                    <div className="mb-4 md:mb-0">
                        <Link to="/" className="text-xl font-semibold text-blue-600">
                            ExpenseManager
                        </Link>
                        <p className="text-sm text-gray-500">Track. Manage. Approve.</p>
                    </div>

                    {/* Center - Links */}
                    <div className="flex space-x-6 mb-4 md:mb-0">
                        <Link to="/about" className="hover:text-blue-600">
                            About
                        </Link>
                        <Link to="/contact" className="hover:text-blue-600">
                            Contact
                        </Link>
                        <Link to="/privacy" className="hover:text-blue-600">
                            Privacy
                        </Link>
                    </div>

                    {/* Right side - Copyright */}
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} ExpenseManager. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
