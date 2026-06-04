"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import routes from "@/lib/ClientRoutes/route";
import Link from "next/link";
import isAuthenticated from "@/lib/CheckAuth/auth";
import { logout } from "@/lib/axios/api";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [authenticated, setAuthenticated] = useState<Boolean>(false);
  const [showLogoutBtn, setShowLogoutBtn] = useState<boolean>(false);
  const router = useRouter();

  const checkAuth = async () => {
    const auth = await isAuthenticated();
    setAuthenticated(auth);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        router.push("/");
        setShowLogoutBtn(false);
      }
    } catch (error) {}
  };

  return (
    <nav className="navbar">
      <h1 className="logo">MekaLearn</h1>
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ul className={`menu ${isOpen ? "open" : ""}`}>
        <li>
          <Link href={routes.HOMEPAGE} className="link">
            Home
          </Link>
        </li>
        <li className="link">
          <Link href={routes.COURSESPAGE} className="link">
            Course
          </Link>
        </li>
        <li className="link">
          <Link href={routes.CATEGORIESPAGE} className="link">
            Categories
          </Link>
        </li>
        <li>
          {authenticated ? (
            <div className="profile">
              <p onClick={() => setShowLogoutBtn(!showLogoutBtn)}>Profile</p>
              {showLogoutBtn && (
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          ) : (
            <div className={`auth-section`}>
              <Link href={routes.LOGINPAGE}>
                <button>Login</button>
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
