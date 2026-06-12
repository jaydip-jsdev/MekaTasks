import styles from "../page.module.css";
import { whyChooseUsFeatures } from "@/lib/constants/whyChooseUsData";

export default function WhyChooseUsSection() {
  return (
    <div className={styles.whyChooseSection}>
      <div className={styles.whyChooseContainer}>
        <h2 className={styles.whyChooseTitle}>Why Choose MekaLearn?</h2>
        <p className={styles.whyChooseSubtitle}>
          We provide everything you need to succeed in your learning journey
        </p>
        <div className={styles.whyChooseGrid}>
          {whyChooseUsFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={styles.whyChooseCard}>
                <div className={styles.whyChooseCardIcon}>
                  <Icon size={40} />
                </div>
                <h3 className={styles.whyChooseCardTitle}>{feature.title}</h3>
                <p className={styles.whyChooseCardDescription}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
