import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import "./ProfilePage.css"


export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  if (!user) return <div>Loading profile...</div>;
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.bio}</p>
    </div>
  );
}

