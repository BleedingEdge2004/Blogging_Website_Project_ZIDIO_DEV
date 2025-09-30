import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";
import "./RegisterPage.css"

export default function RegisterPage() {
    const navigate = useNavigate();

    // Controlled form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // UI state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Basic frontend validation
        if (!name || !email || !password) {
            setError("Please fill all required fields.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setIsSubmitting(true);

            // Call backend register endpoint
            const res = await axios.post("/auth/register", {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password,
            });

            // Backend is expected to return { token, name, role, ... }
            const { token, name: returnedName, role } = res.data;

            // Persist token and small user info for UI + route guards
            localStorage.setItem("token", token);
            if (returnedName) localStorage.setItem("name", returnedName);
            if (role) localStorage.setItem("role", role);

            // Redirect to homepage after registration
            navigate("/");
        } catch (err) {
            // Try to extract backend message, fallback to generic
            const backendMessage = err.response?.data?.message || err.message || "Registration failed";
            setError(backendMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="register-page container">
            <h1>Create an Account</h1> 

            {error && <div className="error-message" role="alert">{error}</div>}

            <form className="form" onSubmit={handleSubmit} aria-describedby="register-desc">
                <p id="register-desc" className="sr-only">
                    Register to create, edit and comment on posts.
                </p>
 
                <label htmlFor="name">Full name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                />

                <label htmlFor="email">Email address</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a secure password"
                    required
                    minLength={6}
                />

                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    required
                    minLength={6}
                />

                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Creating account..." : "Register"}
                </button>
            </form>

            <div className="have-account">
                Already have an account?{" "}
                <button className="link-button" onClick={() => navigate("/login")}>
                    Login
                </button>
            </div>
        </div>
    );
}