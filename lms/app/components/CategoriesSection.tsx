import styles from "../page.module.css";
import CategoryCard from "./categoryCard/CategoryCard";
import { categoriesData } from "@/lib/constants/categoriesData";

export default function CategoriesSection() {
  return (
    <div className={`${styles.category}`}>
      <div className="wrapper">
        <h2 className={styles.featuredTitle}>Browse By Category</h2>
        <p className={styles.featuredSubTitle}>
          Hand-picked courses to kickstart your learning journey
        </p>
        <div className={styles.categories}>
          {categoriesData.map((cat) => (
            <CategoryCard key={cat.id} name={cat.name} icon={cat.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
