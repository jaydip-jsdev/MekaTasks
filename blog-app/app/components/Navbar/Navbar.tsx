"use client";

import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { Menu, X } from "lucide-react";
import ClientRoutes from "@/app/ClientRoutes";

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const checkAuth = async () => {
    const loggedIn = await isAuthenticated();
    setAuthenticated(loggedIn);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <nav className="navbar">
      <Link href={ClientRoutes.HOMEPAGE} className="logo">
        MekaBlogs
      </Link>

      <ul className="nav-menus">
        <li>
          <Link href={ClientRoutes.HOMEPAGE}>Home</Link>
        </li>
        <li>Category</li>
        <li>
          <Link href={ClientRoutes.BLOGS}>Blogs</Link>
        </li>
      </ul>

      <div className="nav-actions desktop-actions">
        {authenticated ? (
          <Link href={ClientRoutes.PROFILE}>
            <div className="nav-profile">Y</div>
          </Link>
        ) : (
          <>
            <Link href={ClientRoutes.LOGINPAGE}>
              <button className="login-btn-nav">Login</button>
            </Link>
            <Link href={ClientRoutes.REGISTERPAGE}>
              <button className="login-btn-nav">Register</button>
            </Link>
          </>
        )}
      </div>

      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {menuOpen && (
        <div className="mobile-menu">
          <Link href={ClientRoutes.HOMEPAGE} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href={ClientRoutes.BLOGS} onClick={() => setMenuOpen(false)}>
            Blogs
          </Link>
          <span>Category</span>

          {authenticated ? (
            <Link
              href={ClientRoutes.PROFILE}
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                href={ClientRoutes.LOGINPAGE}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href={ClientRoutes.REGISTERPAGE}
                onClick={() => setMenuOpen(false)}
              >
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
