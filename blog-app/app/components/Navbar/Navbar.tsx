"use client";

import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkAuth = async () => {
    const loggedIn = await isAuthenticated();
    setAuthenticated(loggedIn);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <nav className="navbar">
      <Link href={"/"} className="logo">
        MekaBlogs
      </Link>

      <ul className="nav-menus">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>Category</li>
        <li>
          <Link href={"/blogs"}>Blogs</Link>
        </li>
      </ul>

      <div className="nav-actions desktop-actions">
        {authenticated ? (
          <Link href={"/profile"}>
            <div className="nav-profile">Y</div>
          </Link>
        ) : (
          <>
            <Link href={"/login"}>
              <button className="login-btn-nav">Login</button>
            </Link>
            <Link href={"/register"}>
              <button className="login-btn-nav">Register</button>
            </Link>
          </>
        )}
      </div>

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {menuOpen && (
        <div className="mobile-menu">
          <Link href={"/"} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href={"/blogs"} onClick={() => setMenuOpen(false)}>
            Blogs
          </Link>
          <span>Category</span>

          {authenticated ? (
            <Link href={"/profile"} onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
          ) : (
            <>
              <Link href={"/login"} onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link href={"/register"} onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;