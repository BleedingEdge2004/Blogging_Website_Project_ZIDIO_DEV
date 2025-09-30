import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import "./AdminUsersPage.css"

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load admin users: " + (err.response?.data?.message || err.message));
      }
    };
    load();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    try {
      await axios.delete(`/admin/users/${id}`);
      setUsers((u) => u.filter((x) => x._id !== id));
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h1>Admin — Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} ({u.email})
            <button onClick={() => deleteUser(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
