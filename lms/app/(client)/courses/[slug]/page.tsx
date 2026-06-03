"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getCourseDetails } from "@/lib/axios/api";
import { useParams } from "next/navigation";

interface Lesson {
  _id: string;
  title: string;
  description: string;
  video_url: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  lessons: Lesson[];
  category: any;
  thumbnail?: string;
  totalLessons?: number;
  enrolledStudents?: number;
  isPublished: boolean;
}

const CourseDetailsPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [courseDetails, setCourseDetails] = useState<Course | null>(null);

  const GetAllCourses = async () => {
    const response = await getCourseDetails(slug);
    setCourseDetails(response.data.data);
  };

  useEffect(() => {
    GetAllCourses();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <iframe
          className={styles.video}
          width="560"
          height="315"
          src={courseDetails?.lessons?.[0]?.video_url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <div className={styles.lessonsContainer}>
          <ul className={styles.lessonsList}>
            {courseDetails?.lessons.map((l, ind) => {
              return <li>{l.title}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
