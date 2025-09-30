import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";
import "./CreatePostPage.css"


export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/posts", { title, content, image });
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      alert("Create post failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="create-post-page">
    <div className="create-post-card">
      <h1>Create Post</h1>
      <form onSubmit={submit} >
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="10" required />

        <label>Image URL (optional)</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} />

        <button type="submit">Publish</button>
      </form>
    </div>
    </div>
  );
}

