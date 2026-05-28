"use client";

import { Heebo } from "next/font/google";
import styles from "./Navbar.module.css";
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [showNavItems, setShowNavItems] = useState<Boolean>(false);
  return (
    <div>
      <nav className={`${styles.navbar}`}>
        <div className={styles.hamburger}>
          {showNavItems ? (
            <div
              className={styles.cross}
              onClick={() => setShowNavItems(false)}
            >
              <MdOutlineCancel />
            </div>
          ) : (
            <GiHamburgerMenu onClick={() => setShowNavItems(!showNavItems)} />
          )}
        </div>
        <ul
          className={`${showNavItems ? styles.show : styles.hide} ${styles.ul}`}
        >
          <li>Works</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
