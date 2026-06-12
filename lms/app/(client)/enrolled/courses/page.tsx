"use client";

import { enrolledCourses } from "@/lib/axios/api";
import { getErrorMessage } from "@/lib/errorHandling/ClientError";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "./enrolled.module.css";
import Card from "@/app/components/card/Card";
import { Course } from "@/Types/courses";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    try {
      const response = await enrolledCourses();
      setCourses(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="wrapper">
      <h1>My Courses</h1>
      <div className={styles["card-container"]}>
        {courses.map((c) => {
          return (
            <Card
              key={c._id}
              category={c.category}
              description={c.description}
              image={c.thumbnail || "/course.webp"}
              slug={c.slug}
              title={c.title}
              isEnrolled={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EnrolledCourses;
