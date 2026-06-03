import styles from "../page.module.css";

export default function HeroSection() {
  return (
    <div className={styles.container}>
      <span className={styles.tagline}>
        Trusted by 500,000+ Learners worldwide
      </span>
      <h1 className={styles.title}>Learn Skill That Build Your Future</h1>
      <p className={styles.subtitle}>
        Join Over 500,000 Learners building real world skills with
        expert-led courses
      </p>
      <div className={styles["search-area"]}>
        <input
          type="text"
          className={styles.searchbar}
          placeholder="Search For Courses"
        />
        <button className={styles["search-btn"]}>Search</button>
      </div>
    </div>
  );
}
