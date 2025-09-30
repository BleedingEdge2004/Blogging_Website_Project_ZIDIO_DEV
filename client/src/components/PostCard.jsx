import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";

export default function PostCard({ post }) {
  
  const snippet = post.content ? (post.content.slice(0, 200) + "...") : "";

  return (
    <article className="post-card">
      {post.image && <img src={post.image} alt={post.title} className="post-img" />}
      <div className="post-content">
        <h3>{post.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: snippet }} />
        <div className="meta">
          <span>By {post.author?.name || "Unknown"}</span>
          <Link to={`/posts/${post._id}`} className="read-more">Read more</Link>
        </div>
      </div>
    </article>
  );
}
