"use client";

import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { Menu, X } from "lucide-react";
import ClientRoutes from "@/app/ClientRoutes";
import { authRoutes, navItems } from "./NavItems";

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
        {navItems.map((item, index) => {
          return (
            <li key={item.link}>
              <Link href={item.link}>{item.name}</Link>
            </li>
          );
        })}
      </ul>

      <div className="nav-actions desktop-actions">
        {authenticated ? (
          <Link href={ClientRoutes.PROFILE}>
            <div className="nav-profile">Y</div>
          </Link>
        ) : (
          <>
            {authRoutes.map((items, index) => {
              return (
                <Link key={index} href={items.link}>
                  <button className="login-btn-nav">{items.name}</button>
                </Link>
              );
            })}
          </>
        )}
      </div>

      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.link}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
          {authenticated ? (
            <Link
              href={ClientRoutes.PROFILE}
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
          ) : (
            <>
              {authRoutes.map((item) => {
                return (
                  <Link href={item.link} onClick={() => setMenuOpen(false)}>
                    {item.name}
                  </Link>
                );
              })}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
