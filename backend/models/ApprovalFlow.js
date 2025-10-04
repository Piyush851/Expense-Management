// models/ApprovalFlow.js
const mongoose = require("mongoose");

// Define the ApprovalFlow schema
const ApprovalFlowSchema = new mongoose.Schema(
  {
    expenseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense", // Reference to Expense collection
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User who submitted
      required: true,
    },
    approvers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Users who will approve
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    currentApproverIndex: {
      type: Number,
      default: 0, // Tracks whose turn it is to approve
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } // createdAt and updatedAt
);

module.exports = mongoose.model("ApprovalFlow", ApprovalFlowSchema);
