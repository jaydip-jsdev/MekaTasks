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
  isAuthenticated?: boolean;
  fromCats?: boolean;
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
  isAuthenticated = true,
  fromCats = false,
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
          <h3 className={styles.cardTitle}>{title.slice(0, 15)}</h3>
          <span>{category?.name}</span>
        </div>
        <p className={styles.cardDesc}>{description.slice(0, 60)}...</p>
        <Link href={isAuthenticated ? "/courses/" + slug : "/login"}>
          <button className={styles.viewBtn}>View</button> 
        </Link>
      </div>
    </div>
  );
};

export default Card;
