"use client";

import React, { useEffect, useState } from "react";
import styles from "./coursepage.module.css";
import { GetCourses } from "@/lib/axios/api";
import Card from "@/app/components/card/Card";

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

const CoursesPage = () => {
  const [courses, setCourses] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await GetCourses();

      setCourses(res.data.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className={`wrapper ${styles["cards-container"]}`}>
        {courses.length > 0 ? (
          courses?.map((c, index) => {
            return (
              <Card
                key={c._id}
                title={c.title}
                slug={c.slug}
                description={c.description}
                category={c.category}
                image="/course.webp"
              />
            );
          })
        ) : (
          <div>Courses Not found</div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;

