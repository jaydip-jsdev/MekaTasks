"use client";

import { useState } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const handleSearch = async () => {
    if (!query.trim()) return;
    router.push(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <div className={styles.container}>
      <span className={styles.tagline}>
        Trusted by 500,000+ Learners worldwide
      </span>
      <h1 className={styles.title}>Learn Skill That Build Your Future</h1>
      <p className={styles.subtitle}>
        Join Over 500,000 Learners building real world skills with expert-led
        courses
      </p>
      <div className={styles["search-area"]}>
        <input
          type="text"
          className={styles.searchbar}
          placeholder="Search For Courses"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles["search-btn"]} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
