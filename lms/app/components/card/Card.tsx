import React from "react";
import styles from "./card.module.css";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

interface CardProps {
  title: string;
  slug: string;
  description: string;
  category: any;
  image: string;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Card = ({
  title,
  slug,
  description,
  category,
  image,
  isAdmin = false,
  onEdit,
  onDelete,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} className={styles["card-img"]} alt={title} />
      {isAdmin && (
        <button className={styles["edit-btn"]} onClick={onEdit}>
          <Pencil />
        </button>
      )}
      {isAdmin && (
        <button className={styles["delete-btn"]} onClick={onDelete}>
          <Trash2 />
        </button>
      )}
      <div className={styles.cardBody}>
        <div className={styles.cardHead}>
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
