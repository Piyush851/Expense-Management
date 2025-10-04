// routes/approvalRoutes.js
const express = require("express");
const router = express.Router();
const ApprovalFlow = require("../models/ApprovalFlow");

// ------------------ CREATE a new approval flow ------------------
router.post("/", async (req, res, next) => {
  try {
    const { expenseId, submittedBy, approvers } = req.body;
    const newFlow = new ApprovalFlow({ expenseId, submittedBy, approvers });
    await newFlow.save();
    res.status(201).json(newFlow);
  } catch (err) {
    next(err); // send to errorHandler
  }
});

// ------------------ GET all approval flows ------------------
router.get("/", async (req, res, next) => {
  try {
    const flows = await ApprovalFlow.find()
      .populate("expenseId", "title amount")
      .populate("submittedBy", "name email")
      .populate("approvers", "name email");
    res.json(flows);
  } catch (err) {
    next(err);
  }
});

// ------------------ GET single approval flow by ID ------------------
router.get("/:id", async (req, res, next) => {
  try {
    const flow = await ApprovalFlow.findById(req.params.id)
      .populate("expenseId", "title amount")
      .populate("submittedBy", "name email")
      .populate("approvers", "name email");
    if (!flow) return res.status(404).json({ message: "Approval flow not found" });
    res.json(flow);
  } catch (err) {
    next(err);
  }
});

// ------------------ UPDATE approval flow (approve/reject) ------------------
router.put("/:id", async (req, res, next) => {
  try {
    const { approverId, comment, status } = req.body;
    const flow = await ApprovalFlow.findById(req.params.id);
    if (!flow) return res.status(404).json({ message: "Approval flow not found" });

    // Add comment
    if (comment) {
      flow.comments.push({ user: approverId, comment });
    }

    // Update status
    if (status) {
      flow.status = status;
    }

    // Move to next approver
    if (flow.currentApproverIndex < flow.approvers.length - 1) {
      flow.currentApproverIndex += 1;
    } else {
      flow.status = "Approved"; // if last approver
    }

    await flow.save();
    res.json(flow);
  } catch (err) {
    next(err);
  }
});

// ------------------ DELETE approval flow ------------------
router.delete("/:id", async (req, res, next) => {
  try {
    const flow = await ApprovalFlow.findByIdAndDelete(req.params.id);
    if (!flow) return res.status(404).json({ message: "Approval flow not found" });
    res.json({ message: "Approval flow deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
