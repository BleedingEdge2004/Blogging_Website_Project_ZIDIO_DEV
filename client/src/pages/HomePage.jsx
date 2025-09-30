import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import PostCard from "../components/PostCard.jsx";
import "./HomePage.css";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // load all posts from backend /posts
    const load = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="center">Loading posts...</div>;

  return (
    <div className="home-page">
      <h1>Latest Posts</h1>
      <div className="posts-grid">
        {posts.map((p) => <PostCard key={p._id} post={p} />)}
      </div>
    </div>
  );
}
