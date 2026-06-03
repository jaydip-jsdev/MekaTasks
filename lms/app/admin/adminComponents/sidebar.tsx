"use client";

import React from "react";
import styles from "./sidebar.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BookOpen, Users, PlayCircle } from "lucide-react";
import routes from "@/lib/ClientRoutes/route";
import { logout } from "@/lib/axios/api";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>MekaLearn</h2>
        <span>Admin Panel</span>
      </div>

      <nav>
        <Link
          href="/admin"
          className={`${styles.link} ${
            pathname === "/admin" ? styles.active : ""
          }`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/admin/courses"
          className={`${styles.link} ${
            pathname.startsWith("/admin/courses") ? styles.active : ""
          }`}
        >
          <BookOpen size={20} />
          <span>Courses</span>
        </Link>

        <Link
          href={routes.ADMIN_CATEGORIES}
          className={`${styles.link} ${
            pathname.startsWith(routes.ADMIN_CATEGORIES) ? styles.active : ""
          }`}
        >
          <Users size={20} />
          <span>Categories</span>
        </Link>

        {/* <Link
          href="/admin/lessons"
          className={`${styles.link} ${
            pathname.startsWith("/admin/lessons") ? styles.active : ""
          }`}
        >
          <PlayCircle size={20} />
          <span>Lessons</span>
        </Link> */}
      </nav>
      <div className={styles.logout}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
