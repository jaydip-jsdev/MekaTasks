"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import routes from "@/lib/ClientRoutes/route";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

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
        <li>Categories</li>
      </ul>
    </nav>
  );
}
