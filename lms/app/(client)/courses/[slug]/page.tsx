"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { AddToHistory, getCourseDetails } from "@/lib/axios/api";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/ClientError";
import { Course } from "@/Types/courses";

const CourseDetailsPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState(0);

  const recordHistory = async (lessonId: string) => {
    try {
      const response = await AddToHistory(lessonId);
    } catch (error) {
      console.log(error);
    }
  };

  const getDetails = async () => {
    try {
      const response = await getCourseDetails(slug);
      const data: Course = response.data.data;
      setCourseDetails(data);

      if (data?.lessons?.length > 0) {
        await recordHistory(data.lessons[0]._id);
      }
    } catch (error) {
      console.log("ERORO: " + error);
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (slug) {
      getDetails();
    }
  }, [slug]);

  const handleLessonSelect = async (index: number, lessonId: string) => {
    setSelectedLesson(index);
    await recordHistory(lessonId);
  };

  if (!courseDetails) {
    return (
      <div className={styles.noLessons}>
        <p>Loading...</p>
      </div>
    );
  }

  if (courseDetails?.lessons?.length < 1) {
    return (
      <div className={styles.noLessons}>
        <p>No Lessons Found</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <iframe
          className={styles.video}
          width="560"
          height="315"
          src={courseDetails?.lessons?.[selectedLesson]?.video_url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <div className={styles.lessonsContainer}>
          <ul className={styles.lessonsList}>
            {courseDetails?.lessons.map((l, ind) => {
              return (
                <li
                  key={l._id}
                  onClick={() => handleLessonSelect(ind, l._id)}
                  className={`${styles.lesson} ${
                    ind === selectedLesson ? styles.active : ""
                  }`}
                >
                  {l.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
