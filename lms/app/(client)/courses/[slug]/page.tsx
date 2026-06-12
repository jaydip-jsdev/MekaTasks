"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { AddToHistory, getCourseDetails } from "@/lib/axios/api";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/errorHandling/ClientError";
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

      if (data) {
        setCourseDetails(data);
      }

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
    try {
      await recordHistory(lessonId);
    } catch (error) {
      // we don't need to show this error to the use that's why i am consoling this only for developers it's background process
      console.log(error);
    }
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
        <video
          className={styles.video}
          controls
          controlsList="nodownload"
          preload="metadata"
          src={courseDetails?.lessons?.[selectedLesson]?.video_url}
        >
          Your browser does not support the video tag.
        </video>
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
