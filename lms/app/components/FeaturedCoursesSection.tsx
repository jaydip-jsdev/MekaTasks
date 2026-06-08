"use client";

import styles from "../page.module.css";
import Card from "./card/Card";
import { useCourses } from "@/hooks/useCourses";

export default function FeaturedCoursesSection() {
  const { authenticated, courses, error, handleEnroll, loading } = useCourses();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`${"wrapper"} ${styles.featured}`}>
      <h2 className={styles.featuredTitle}>Featured Courses</h2>
      <p className={styles.featuredSubTitle}>
        Hand-picked courses to kickstart your learning journey
      </p>
      <div>
        <div className={styles.cardContainer}>
          {courses.slice(0, 8).map((course) => (
            <Card
              key={course._id}
              title={course.title}
              category={course.category}
              slug={course.slug}
              description={course.description}
              image={course.thumbnail || "/course.webp"}
              handleEnroll={() => handleEnroll(course._id)}
              isAuthenticated={authenticated}
              isEnrolled={course.isEnrolled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
