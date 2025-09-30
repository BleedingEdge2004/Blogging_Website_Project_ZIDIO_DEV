import React, { useState } from "react";
import axios from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      // save JWT and small user info for UI/guarding
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", res.data.role);
      navigate("/");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        <button type="submit">Login</button>
      </form>
      <div className="dont-have-account">
                Don't have an Account ?<br></br> Create a New Account{" "}
                <button className="link-button" onClick={() => navigate("/register")}>
                    Register Now
                </button>
            </div>
    </div>
  );
}

