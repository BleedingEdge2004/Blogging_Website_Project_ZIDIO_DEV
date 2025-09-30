import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios.js";
import "./PostDetailsPage.css"


export default function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/${id}/comments`, { text: commentText });
      // append new comment locally for instant UI
      setPost((p) => ({ ...p, comments: [...(p.comments || []), res.data] }));
      setCommentText("");
    } catch (err) {
      alert("Add comment failed: " + (err.response?.data?.message || err.message));
    }
  };

  const toggleLike = async () => {
    try {
      const res = await axios.post(`/${id}/like`);
      setPost((p) => ({ ...p, likes: res.data }));
    } catch (err) {
      alert("Like failed: " + (err.response?.data?.message || err.message));
    }
  };

  if (!post) return <div>Loading post...</div>;

  return (

<div className="post-details-page">
  <div className="post-details-card">
      <h1>{post.title}</h1>
      <div>By {post.author?.name}</div>
      {post.image && <img src={post.image} alt={post.title} style={{ maxWidth: "100%" }} />}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div>
        <button onClick={toggleLike}>Like ({post.likes?.length || 0})</button>
      </div>

      <section>
        <h3>Comments</h3>
        <form onSubmit={addComment}>
          <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} required />
          <button type="submit">Add Comment</button>
        </form>

        <ul>
          {(post.comments || []).map((c) => (
            <li key={c._id}>{c.text} — <small>{c.user?.name || "User"}</small></li>
          ))}
        </ul>
      </section>
    
  </div>
</div>
    
  );
}
