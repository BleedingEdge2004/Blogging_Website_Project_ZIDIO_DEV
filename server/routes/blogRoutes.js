import express from "express";
import Blog from "../models/Blog.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create blog
router.post("/", protect, async (req, res) => {
  const { title, content, category, image } = req.body;
  const blog = await Blog.create({ title, content, category, image, author: req.user._id });
  res.status(201).json(blog);
});

// Get all blogs with search & category
router.get("/", async (req, res) => {
  const { search, category } = req.query;
  let filter = {};
  if (search) filter.title = { $regex: search, $options: "i" };
  if (category) filter.category = category;
  const blogs = await Blog.find(filter).populate("author", "name").populate("category", "name");
  res.json(blogs);
});

// Get single blog
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author", "name").populate("category", "name");
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
});

// Update blog
router.put("/:id", protect, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  if (blog.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }
  blog.title = req.body.title || blog.title;
  blog.content = req.body.content || blog.content;
  blog.category = req.body.category || blog.category;
  blog.image = req.body.image || blog.image;
  await blog.save();
  res.json(blog);
});

// Delete blog
router.delete("/:id", protect, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  if (blog.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }
  await blog.deleteOne();
  res.json({ message: "Blog removed" });
});

export default router;
