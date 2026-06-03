"use client";

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Card from "@/app/components/card/Card";
import { DeleteCourse, GetCourses } from "@/lib/axios/api";
import AddCourseModal from "./AddCourseModal";

interface ApiResponse {
  _id: string;
  title: string;
  slug: string;
  description: string;
  lesson: any[];
  category: any;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const CoursePage = () => {
  const [courses, setCourses] = useState<ApiResponse[]>([]);
  const [addingCourse, setAddingCourse] = useState<boolean>(false);
  const [editing, setEditing] = useState("");

  const getAllCourses = async () => {
    try {
      const response = await GetCourses();
      setCourses(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const handleEditCourse = (slug: string) => {
    setEditing(slug);
    setAddingCourse(true);
  };

  const handleDelete = async (slug: string) => {
    const response = await DeleteCourse(slug);
    getAllCourses();
  };

  return (
    <div>
      <div className={styles["course-header"]}>
        <button onClick={() => setAddingCourse(true)}>Add Course</button>
      </div>
      <div className={styles.cardContainer}>
        {courses.map((c, i) => {
          return (
            <Card
              title={c.title}
              category={c.category}
              description={c.description}
              image="/course.webp"
              slug={c.slug}
              isAdmin
              key={c._id}
              onEdit={() => handleEditCourse(c.slug)}
              onDelete={() => handleDelete(c.slug)}
            />
          );
        })}
      </div>
      {addingCourse && (
        <AddCourseModal
          setAddingCourse={setAddingCourse}
          fetchCourses={getAllCourses}
          editingSlug={editing}
          setEditing={setEditing}
        />
      )}
    </div>
  );
};

export default CoursePage;
