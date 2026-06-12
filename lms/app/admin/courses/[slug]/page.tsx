"use client";

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { DeleteLesson, getCourseDetails } from "@/lib/axios/api";
import { useParams } from "next/navigation";
import UploadLessonModal from "./UploadLessonModal";
import { Lesson } from "@/Types/Lesson";

const CourseDetailsPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [addingLesson, setAddingLesson] = useState<boolean>(false);
  const [courseId, setCourseId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string>("");

  const getLessons = async () => {
    try {
      setLoading(true);
      const response = await getCourseDetails(slug);
      setLessons(response.data.data.lessons);
      setCourseId(response.data.data._id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLessons();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await DeleteLesson(id);
      if (response.status === 200) {
        await getLessons();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className={styles.loading}>
        {" "}
        <p>Loading...</p>
      </div>
    );

  return (
    <div>
      <div className={styles.header}>
        <h1>Lessons for this course</h1>
        <button onClick={() => setAddingLesson(true)}>Upload New Lesson</button>
      </div>
      <div>
        <ul className={styles.lessonsList}>
          {lessons.length > 0 ? (
            lessons.map((l) => {
              return (
                <li key={l._id}>
                  <div className={styles.lesson}>
                    <img
                      src={l.thumbnail || "/course.webp"}
                      className={styles.lessonThumbnail}
                      alt=""
                    />
                    <div>
                      <h1>{l.title}</h1>
                      <p>{l.description}</p>
                    </div>
                  </div>
                  <div className={styles.lessonActions}>
                    <button onClick={() => setEditingId(l._id)}>Edit</button>
                    <button onClick={() => handleDelete(l._id)}>Delete</button>
                  </div>
                </li>
              );
            })
          ) : (
            <div className={styles.noLessons}>
              <p>No Lessons Found</p>
            </div>
          )}
        </ul>
      </div>
      {(addingLesson || editingId !== "") && (
        <UploadLessonModal
          fetchLessons={getLessons}
          setAddingLesson={setAddingLesson}
          courseId={courseId}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      )}
    </div>
  );
};

export default CourseDetailsPage;
