import React from 'react';
import { CheckCircle, XCircle, Clock, DollarSign, Tag, User } from 'lucide-react';

/**
 * Renders a card displaying a single expense and offering approval/rejection actions.
 * This component is used by Managers and Admins to review pending expenses.
 *
 * @param {object} props - Component props.
 * @param {object} props.expense - The expense object to display.
 * @param {function} props.onAction - Callback function when an action (Approve/Reject) is taken.
 * @param {boolean} [props.isActionable=true] - If true, show the Approve/Reject buttons.
 * @param {string} [props.companyCurrency='USD'] - The company's default currency (for conversion display).
 */
const ApprovalCard = ({ expense, onAction, isActionable = true, companyCurrency = 'USD' }) => {

    // Helper to determine status styling
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Approved':
                return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300' };
            case 'Rejected':
                return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-300' };
            case 'Pending':
            default:
                return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-300' };
        }
    };

    const { icon: StatusIcon, color, bg, border } = getStatusStyle(expense.status);

    // Mock conversion logic (You'll replace this with actual data later)
    const convertedAmount = (expense.amount * 1.05).toFixed(2); // Mock 5% conversion fee/rate

    return (
        <div className={`
        relative p-6 rounded-xl shadow-lg transition duration-300 transform 
        hover:shadow-xl hover:-translate-y-0.5 border-2 ${border} bg-white
    `}>
            {/* Status Badge */}
            <div className={`absolute top-0 right-0 m-4 px-3 py-1 text-xs font-bold rounded-full ${color} ${bg}`}>
                <div className="flex items-center">
                    <StatusIcon className="w-4 h-4 mr-1" />
                    {expense.status}
                </div>
            </div>

            {/* Primary Details: Amount & Category */}
            <h3 className="text-xl font-extrabold text-gray-900 mb-1 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-indigo-600" />
                {expense.currency} {expense.amount.toFixed(2)}
            </h3>
            <p className="text-sm font-medium text-gray-500 mb-4">
                (Est. payout: {companyCurrency} {convertedAmount})
            </p>

            {/* Metadata */}
            <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
                <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-indigo-400" />
                    <span className="font-semibold">{expense.submitterName || 'Employee Name Missing'}</span>
                </div>
                <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-indigo-400" />
                    <span>Category: <span className="font-medium text-gray-800">{expense.category}</span></span>
                </div>
                <p className="line-clamp-2 text-xs pt-1">
                    <span className="font-bold">Description: </span>{expense.description}
                </p>
            </div>

            {/* Action Buttons (Only for Pending and if actionable) */}
            {isActionable && expense.status === 'Pending' && (
                <div className="mt-6 pt-4 border-t flex space-x-3">
                    <button
                        onClick={() => onAction(expense._id, 'Approved')}
                        className="flex-1 py-2 px-4 text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition shadow-md"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => onAction(expense._id, 'Rejected')}
                        className="flex-1 py-2 px-4 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition shadow-md"
                    >
                        Reject
                    </button>
                </div>
            )}

            {/* Approval/Rejection Comments (Placeholder for future) */}
            {expense.status !== 'Pending' && expense.approvalComment && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-700 border-l-4 border-gray-300">
                    <span className="font-semibold">Comment:</span> {expense.approvalComment}
                </div>
            )}
        </div>
    );
};

export default ApprovalCard;
