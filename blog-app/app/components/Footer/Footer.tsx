import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>MekaBlogs</h2>
          <p>Sharing ideas, stories, and tech insights with the world.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Blogs</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaFacebookF size={20} />
            <FaInstagram size={20} />
            <FaXTwitter size={20} />
            <FaLinkedinIn size={20} />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 MekaBlogs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
