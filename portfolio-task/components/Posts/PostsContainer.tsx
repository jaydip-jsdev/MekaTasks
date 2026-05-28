import React from "react";
import styles from "./post.module.css";
import { postData } from "./postsData";

const PostsContainer = () => {
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <div className={styles.postHeader}>
          <p className={styles.recent}>Recent posts</p>
          <p className={styles.view}>View All</p>
        </div>
        <div className={styles.cardContainer}>
          {postData.map((item, ind) => {
            return (
              <div key={ind} className={styles.card}>
                <h2 className={styles.cardHeading}>{item.title}</h2>
                <div className={styles.options}>
                  <span>{item.date}</span> |<span>{item.label}</span>
                </div>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PostsContainer;
