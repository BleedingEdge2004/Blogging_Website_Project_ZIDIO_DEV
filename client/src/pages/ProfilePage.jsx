import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Use the centralized axios instance that reads REACT_APP_API_URL from client/.env
import axios from "../api/axios.js";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);         // current user profile
  const [posts, setPosts] = useState([]);         // posts authored by user
  const [loading, setLoading] = useState(true);   // loading state
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    let mounted = true; 

    const fetchProfileAndPosts = async () => {
      try {
        const profileRes = await axios.get("/auth/profile");
        if (!mounted) return;
        setUser(profileRes.data);

        try {
          const postsRes = await axios.get(`/posts?author=${profileRes.data._id}`);
          if (mounted) setPosts(postsRes.data || []);
        } catch (errQuery) {
          try {
            const postsMineRes = await axios.get("/posts/mine");
            if (mounted) setPosts(postsMineRes.data || []);
          } catch (errMine) {
            console.warn("Could not fetch user posts (tried ?author and /posts/mine)", errQuery, errMine);
            if (mounted) setPosts([]);
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfileAndPosts();

    return () => { mounted = false; };
  }, [token, navigate]);

  // Delete a post (author or admin only at backend)
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`/posts/${postId}`);
      // update local UI immediately
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Delete failed";
      alert(msg);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* PROFILE INFO */}
        {user && (
          <>
            {user.profileImage && (
              <img src={user.profileImage} alt={user.name} style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginBottom: 12 }} />
            )}
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            {user.bio && <p>{user.bio}</p>}
          </>
        )}

        {/* USER POSTS SECTION */}
        <div className="user-posts">
          <h2>My Posts</h2>

          {posts.length === 0 ? (
            <p>You have not created any posts yet.</p>
          ) : (
            <ul className="user-posts-list">
              {posts.map((post) => (
                <li key={post._id} className="user-post-item">
                  <h3>{post.title}</h3>

                  <p>
                    {stripHtml(post.content || "").slice(0, 140)}
                    {post.content && post.content.length > 140 ? "..." : ""}
                  </p>

                  <div className="user-post-actions">
                    <button onClick={() => navigate(`/posts/edit/${post._id}`)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(post._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* Helper: remove HTML tags from rich text content to make a safe preview */
function stripHtml(html) {
  if (!html) return "";
  // Basic stripping — works for simple previews (keeps JS-free)
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}