"use client";

import styles from "./coursepage.module.css";
import Card from "@/app/components/card/Card";
import { useCourses } from "@/hooks/useCourses";

const CoursesPage = () => {
  const { authenticated, courses, error, handleEnroll, loading } =
    useCourses();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className={`wrapper ${styles["cards-container"]}`}>
        {courses?.length > 0 ? (
          courses?.map((c, index) => {
            return (
              <Card
                key={c._id}
                title={c.title}
                slug={c.slug}
                description={c.description}
                category={c.category}
                image="/course.webp"
                isAuthenticated={authenticated}
                isEnrolled={c.isEnrolled}
                handleEnroll={() => handleEnroll(c._id)}
              />
            );
          })
        ) : (
          <div>Courses Not found</div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
