const express = require("express");
const bcrypt = require("bcrypt");
const {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../models/accountModel");
const auth = require("../helpers/auth");
const { sign } = require("jsonwebtoken");

const router = express.Router();

// Get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// Registration Route
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await createUser(email, hashedPassword);
    res.status(201).json({
      success_message: "Your email is registered",
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// Login Route
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token with expiration
    const token = sign({ user: user.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ success_message: "You are logged in", token });
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

// Update User Route
router.put("/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash password for update user
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await updateUser(id, hashedPassword); // Use the id to update
    if (!result) {
      return res.status(404).json({ error: "User not found for update" });
    }
    res.status(200).json({
      success_message: "User updated",
      id: result.id,
      email: result.email,
    });
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

// Delete User Route
router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id); // Find user by id
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const deletedUser = await deleteUser(id);
    res.status(204).json(deletedUser);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

// Handle Logout (Client-side handles JWT token removal)
router.get("/logout", (req, res) => {
  res.status(200).json({ success_message: "You are logged out" });
});

module.exports = router;
