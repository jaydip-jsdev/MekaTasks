import styles from "../page.module.css";
import Card from "./card/Card";
import { featuredCoursesData } from "@/lib/constants/featuredCoursesData";

export default function FeaturedCoursesSection() {
  return (
    <div className={`${"wrapper"} ${styles.featured}`}>
      <h2 className={styles.featuredTitle}>Featured Courses</h2>
      <p className={styles.featuredSubTitle}>
        Hand-picked courses to kickstart your learning journey
      </p>
      <div>
        <div className={styles.cardContainer}>
          {featuredCoursesData.map((course) => (
            <Card
              key={course.id}
              title={course.title}
              description={course.description}
              image={course.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
