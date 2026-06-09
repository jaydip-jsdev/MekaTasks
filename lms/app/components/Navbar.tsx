"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import routes from "@/lib/ClientRoutes/route";
import Link from "next/link";
import { logout } from "@/lib/axios/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/ClientError";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showLogoutBtn, setShowLogoutBtn] = useState<boolean>(false);
  const router = useRouter();

  const { authenticated, setAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        setAuthenticated(false);
        router.push("/");
        setShowLogoutBtn(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/mekalearn.png" className="logo-img" alt="" />
        <h1 className="logo">MekaLearn</h1>
      </div>
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ul className={`menu ${isOpen ? "open" : ""}`}>
        <li>
          <Link
            href={routes.HOMEPAGE}
            className="link"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
        </li>
        <li className="link">
          <Link
            href={routes.COURSESPAGE}
            className="link"
            onClick={() => setIsOpen(false)}
          >
            Course
          </Link>
        </li>
        <li className="link">
          <Link
            href={routes.CATEGORIESPAGE}
            className="link"
            onClick={() => setIsOpen(false)}
          >
            Categories
          </Link>
        </li>
        <li>
          {authenticated ? (
            <div className="profile">
              <p onClick={() => setShowLogoutBtn(!showLogoutBtn)}>Profile</p>
              {showLogoutBtn && (
                <div className="popup">
                  <Link
                    href={routes.ENROLLED_COURSES}
                    onClick={() => setShowLogoutBtn(false)}
                  >
                    <button className="enrolled-courses-btn">My Courses</button>
                  </Link>
                  <Link
                    href={routes.HISTORY}
                    onClick={() => setShowLogoutBtn(false)}
                  >
                    <button className="history-btn enrolled-courses-btn">
                      History
                    </button>
                  </Link>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
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
