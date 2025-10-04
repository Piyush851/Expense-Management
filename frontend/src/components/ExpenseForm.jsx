import React, { useState, useCallback } from "react";
import {
    UploadCloud,
    FileText,
    Loader2,
    DollarSign,
    Tag,
    Calendar,
    Edit,
} from "lucide-react";

// Mock API endpoint for the FastAPI service
const OCR_API_URL = "http://localhost:8000/ocr/scan"; // Update if your FastAPI server runs on a different port

/**
 * Renders the form for employees to submit a new expense claim.
 * Includes a simulated OCR functionality to auto-fill fields from a receipt image.
 *
 * @param {object} props - Component props.
 * @param {function} props.onSubmit - Callback function to submit the final expense data.
 */
const ExpenseForm = ({ onSubmit }) => {
    const [expense, setExpense] = useState({
        amount: "",
        currency: "USD",
        category: "Travel",
        description: "",
        date: new Date().toISOString().split("T")[0],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isOcrMode, setIsOcrMode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * Simulates calling the FastAPI service for OCR
     * @param {File} receiptFile - The image file uploaded by the user.
     */
    const scanReceiptWithOCR = useCallback(async (receiptFile) => {
        setIsLoading(true);
        setError(null);
        setMessage(null);

        const formData = new FormData();
        formData.append("file", receiptFile);

        try {
            // NOTE: This call will only work if your FastAPI service is running locally on port 8000
            const response = await fetch(OCR_API_URL, {
                method: "POST",
                // Headers are automatically set for FormData
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`OCR Scan failed: ${response.statusText}`);
            }

            const ocrData = await response.json();

            // Auto-populate the form with OCR results
            setExpense({
                amount: ocrData.amount.toString(),
                currency: ocrData.currency || "USD",
                category: ocrData.category || "Other",
                description: ocrData.description,
                date: ocrData.date || new Date().toISOString().split("T")[0],
            });

            setMessage(
                "Receipt successfully scanned! Please review the details below."
            );
            setIsOcrMode(true); // Switch to review/manual mode
        } catch (err) {
            console.error("OCR Error:", err);
            setError("Could not scan receipt. Please enter details manually.");
            setIsOcrMode(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            scanReceiptWithOCR(file);
        }
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (!expense.amount || !expense.description) {
            setError("Please fill in at least the amount and description.");
            return;
        }

        onSubmit({
            ...expense,
            amount: parseFloat(expense.amount),
            // In a real app, 'submitter' and '_id' would be added by the backend
        });

        // Reset form after successful submission
        setExpense({
            amount: "",
            currency: "USD",
            category: "Travel",
            description: "",
            date: new Date().toISOString().split("T")[0],
        });
        setIsOcrMode(false);
        setMessage("Expense submitted successfully!");
        setError(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-2xl border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-indigo-700 border-b pb-3">
                Submit New Expense
            </h2>

            {error && (
                <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}
            {message && (
                <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                    {message}
                </div>
            )}

            <div
                className={`transition-all duration-300 ${!isOcrMode ? "opacity-100 h-auto" : "opacity-50 h-0 overflow-hidden"
                    }`}
            >
                <label
                    htmlFor="receipt-upload"
                    className={`
            mb-6 block w-full text-center p-6 border-4 border-dashed rounded-xl cursor-pointer transition 
            ${isLoading
                            ? "bg-gray-200 border-gray-400"
                            : "bg-indigo-50 border-indigo-300 hover:border-indigo-500"
                        }
          `}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center text-indigo-600">
                            <Loader2 className="w-6 h-6 animate-spin mr-3" />
                            Scanning Receipt...
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-indigo-600">
                            <UploadCloud className="w-8 h-8 mb-2" />
                            <p className="font-semibold">Click to Upload Receipt</p>
                            <p className="text-sm text-gray-500">
                                Scan via OCR to auto-fill (PNG, JPG, max 5MB)
                            </p>
                        </div>
                    )}
                    <input
                        id="receipt-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isLoading || isOcrMode}
                    />
                </label>
            </div>

            {isOcrMode && (
                <div className="flex items-center justify-between p-3 mb-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <p className="text-sm font-medium text-indigo-800 flex items-center">
                        <Edit className="w-4 h-4 mr-2" />
                        Reviewing OCR results. Edit fields if needed before submission.
                    </p>
                    <button
                        onClick={() => setIsOcrMode(false)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 underline"
                    >
                        Switch to Manual
                    </button>
                </div>
            )}

            <form
                onSubmit={handleManualSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Expense Date */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                        <Calendar className="w-4 h-4 mr-1 text-gray-500" /> Date of Expense
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={expense.date}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        required
                    />
                </div>

                {/* Category */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                        <Tag className="w-4 h-4 mr-1 text-gray-500" /> Category
                    </label>
                    <select
                        name="category"
                        value={expense.category}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        required
                    >
                        <option value="Travel">Travel</option>
                        <option value="Food">Food / Meals</option>
                        <option value="Software">Software / Subscriptions</option>
                        <option value="Office">Office Supplies</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Amount */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                        <DollarSign className="w-4 h-4 mr-1 text-gray-500" /> Amount
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="0.00"
                        min="0.01"
                        step="0.01"
                        required
                    />
                </div>

                {/* Currency */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                        <span className="w-4 h-4 mr-1">₺</span> Currency
                    </label>
                    <input
                        type="text"
                        name="currency"
                        value={expense.currency}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="USD, EUR, etc."
                        required
                    />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                        <FileText className="w-4 h-4 mr-1 text-gray-500" /> Description /
                        Vendor
                    </label>
                    <textarea
                        name="description"
                        value={expense.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        rows="3"
                        placeholder="Restaurant name, purpose of travel, subscription details..."
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 pt-4">
                    <button
                        type="submit"
                        disabled={isLoading || !expense.amount}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin mr-3" />
                        ) : (
                            <FileText className="w-6 h-6 mr-3" />
                        )}
                        {isLoading ? "Processing..." : "Finalize & Submit Claim"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;
