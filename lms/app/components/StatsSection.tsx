import styles from "../page.module.css";
import { statsData } from "@/lib/constants/statsData";

export default function StatsSection() {
  return (
    <div className={styles.statsSection}>
      <div className={styles.statsContainer}>
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>
                <Icon size={48} />
              </div>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
