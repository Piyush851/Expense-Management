// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ------------------ GET ALL USERS ------------------
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// ------------------ GET CURRENT USER ------------------
router.get("/me", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// ------------------ UPDATE USER PROFILE ------------------
router.put("/me", authMiddleware, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // ideally hash it in model pre-save

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    next(err);
  }
});

// ------------------ DELETE USER ------------------
router.delete("/me", authMiddleware, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
