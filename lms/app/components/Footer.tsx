import styles from "../page.module.css";
import { Mail, MapPin, Phone, Code, Share2, Link } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerLogo}>MekaLearn</h3>
          <p className={styles.footerDescription}>
            Empowering learners worldwide with quality education and
            industry-relevant skills.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon}>
              <Code size={20} />
            </a>
            <a href="#" className={styles.socialIcon}>
              <Share2 size={20} />
            </a>
            <a href="#" className={styles.socialIcon}>
              <Link size={20} />
            </a>
            <a href="#" className={styles.socialIcon}>
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Quick Links</h4>
          <ul className={styles.footerList}>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Courses</a>
            </li>
            <li>
              <a href="#">Categories</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Resources</h4>
          <ul className={styles.footerList}>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Contact Support</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Contact Info</h4>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={18} />
              <span>support@mekalearn.com</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={18} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={18} />
              <span>123 Learning St, Education City</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2026 MekaLearn. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
