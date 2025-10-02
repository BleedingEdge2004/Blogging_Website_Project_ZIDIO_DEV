import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">Blogging Page </Link>
      </div>
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      <div className={`nav-right ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="text-clr">Home</Link>
        {token ? (
          <>
            <Link to="/create" className="text-clr">Create</Link>
            <Link to="/profile" className="text-clr">{name || "Profile"}</Link>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-clr">Login</Link>
            <Link to="/register" className="text-clr">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
