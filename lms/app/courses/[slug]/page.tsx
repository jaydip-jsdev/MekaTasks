import React from "react";
import styles from "./page.module.css";

const CourseDetailsPage = () => {
    
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <iframe
          className={styles.video}
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Z4k_TE6-pKs?si=qV87lzq9kj0ho0rW"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <div className={styles.lessonsContainer} >
          <ul className={styles.lessonsList} > 
            <li>Lesson 1</li>
            <li>Lesson 2</li>
            <li>Lesson 3</li>
            <li>Lesson 4</li>
            <li>Lesson 5</li>
            <li>Lesson 6</li>
            <li>Lesson 7</li>
            <li>Lesson 8</li>
            <li>Lesson 9</li>
            <li>Lesson 10</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
