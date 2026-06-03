import React from "react";
import styles from "./card.module.css";
import Link from "next/link";

interface CardProps {
  title: string;
  slug: string;
  description: string;
  category: any;
  image: string;
}

const Card = ({ title, slug, description, category, image }: CardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} className={styles["card-img"]} alt={title} />
      <div className={styles.cardBody}>
        <div className={styles.cardHead} >
          <h3 className={styles.cardTitle}>{title}</h3>
          <span>{category?.name}</span>
        </div>
        <p className={styles.cardDesc}>{description}</p>
        <Link href={"courses/" + slug}>
          <button className={styles.viewBtn}>View</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
