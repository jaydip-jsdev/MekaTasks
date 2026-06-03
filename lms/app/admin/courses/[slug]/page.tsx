"use client";

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { getCourseDetails } from "@/lib/axios/api";
import { useParams } from "next/navigation";
import UploadLessonModal from "./UploadLessonModal";

interface ILessons {
  title: string;
}

const CourseDetailsPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [lessons, setLessons] = useState<ILessons[]>([]);
  const [addingLesson, setAddingLesson] = useState<boolean>(false);
  const [courseId, setCourseId] = useState("");

  const getLessons = async () => {
    const response = await getCourseDetails(slug);
    setLessons(response.data.data.lessons);
    setCourseId(response.data.data._id);
  };

  useEffect(() => {
    getLessons();
  }, []);
  return (
    <div>
      <div className={styles.header}>
        <h1>Lessons for this course</h1>
        <button onClick={() => setAddingLesson(true)}>Upload New Lesson</button>
      </div>
      <div>
        <ul>
          {lessons.map((l) => {
            return <li>{l.title}</li>;
          })}
        </ul>
      </div>
      {addingLesson && (
        <UploadLessonModal
          fetchLessons={getLessons}
          setAddingLesson={setAddingLesson}
          courseId={courseId}
        />
      )}
    </div>
  );
};

export default CourseDetailsPage;
