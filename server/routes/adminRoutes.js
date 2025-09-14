import express from "express";
import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Category from "../models/Category.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all users
router.get("/users", protect, admin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Delete user
router.delete("/users/:id", protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.deleteOne();
  res.json({ message: "User deleted" });
});

// Get all posts (moderation)
router.get("/posts", protect, admin, async (req, res) => {
  const posts = await Blog.find().populate("author", "name email");
  res.json(posts);
});

// Delete a post
router.delete("/posts/:id", protect, admin, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Post not found" });
  await blog.deleteOne();
  res.json({ message: "Post deleted by admin" });
});

// Manage categories
router.post("/categories", protect, admin, async (req, res) => {
  const { name, slug } = req.body;
  const exists = await Category.findOne({ slug });
  if (exists) return res.status(400).json({ message: "Category already exists" });
  const category = await Category.create({ name, slug });
  res.status(201).json(category);
});

router.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.delete("/categories/:id", protect, admin, async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  await category.deleteOne();
  res.json({ message: "Category deleted" });
});

export default router;
