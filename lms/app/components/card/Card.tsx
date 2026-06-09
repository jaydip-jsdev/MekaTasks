import React from "react";
import styles from "./card.module.css";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { CardProps } from "@/Types/card";

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
  isEnrolled,
  handleEnroll,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} className={styles["card-img"]} alt={title} />
      {isAdmin && (
        <>
          <button className={styles["edit-btn"]} onClick={onEdit}>
            <Pencil />
          </button>

          <button className={styles["delete-btn"]} onClick={onDelete}>
            <Trash2 />
          </button>
        </>
      )}
      <div className={styles.cardBody}>
        <div className={styles.cardHead}>
          <h3 className={styles.cardTitle}>{title.slice(0, 15)}</h3>
          <span>
            {typeof category === "string" ? category : category?.name}
          </span>{" "}
        </div>
        <p className={styles.cardDesc}>{description.slice(0, 60)}...</p>
        {isAdmin ? (
          <Link href={isAuthenticated ? "courses/" + slug : "/login"}>
            <button className={styles.viewBtn}>View</button>
          </Link>
        ) : isEnrolled ? (
          <Link href={"/courses/" + slug}>
            <button className={styles.viewBtn}>Watch Now</button>
          </Link>
        ) : (
          <button className={styles.viewBtn} onClick={handleEnroll}>
            Enroll Now{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
