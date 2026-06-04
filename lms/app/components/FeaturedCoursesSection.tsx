"use client";

import { GetCourses } from "@/lib/axios/api";
import styles from "../page.module.css";
import Card from "./card/Card";
import { useEffect, useState } from "react";

interface ApiResponse {
  _id: string;
  title: string;
  category: string;
  slug: string;
  description: string;
  image: string;
}

export default function FeaturedCoursesSection() {
  const [featured, setFeatured] = useState<ApiResponse[]>([]);
  const featuredCourses = async () => {
    const response = await GetCourses();
    const featured = response.data.data.slice(0, 8);
    setFeatured(featured);
  };

  useEffect(() => {
    featuredCourses();
  }, []);

  return (
    <div className={`${"wrapper"} ${styles.featured}`}>
      <h2 className={styles.featuredTitle}>Featured Courses</h2>
      <p className={styles.featuredSubTitle}>
        Hand-picked courses to kickstart your learning journey
      </p>
      <div>
        <div className={styles.cardContainer}>
          {featured.map((course) => (
            <Card
              key={course._id}
              title={course.title}
              category={course.category}
              slug={course.slug}
              description={course.description}
              image={course.image || "/course.webp"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
