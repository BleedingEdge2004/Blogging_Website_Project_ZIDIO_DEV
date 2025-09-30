import React from "react";
import { Navigate } from "react-router-dom";

/*
  Simple guard: checks localStorage token.
  If adminOnly prop is true, also checks role stored in localStorage (set at login).
  This is lightweight; for stronger checks you can call /auth/profile to validate token.
*/
export default function PrivateRoute({ children, adminOnly = false }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) return <Navigate to="/login" replace />;          // not authenticated
    if (adminOnly && role !== "admin") return <Navigate to="/" replace />; // not admin
    return children;
}
