import express from "express";
import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add comment
router.post("/:id/comments", protect, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  const comment = await Comment.create({ text: req.body.text, user: req.user._id, post: req.params.id });
  res.status(201).json(comment);
});

// Like/Unlike
router.post("/:id/like", protect, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  const alreadyLiked = blog.likes.includes(req.user._id);
  if (alreadyLiked) {
    blog.likes.pull(req.user._id);
  } else {
    blog.likes.push(req.user._id);
  }
  await blog.save();
  res.json(blog.likes);
});

export default router;
