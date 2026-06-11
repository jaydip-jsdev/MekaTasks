"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EnrollCourse, GetCategories, GetCourses } from "@/lib/axios/api";
import style from "./style.module.css";
import Card from "@/app/components/card/Card";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/ClientError";
import { Course } from "@/Types/courses";
import { Category } from "@/Types/category";
import { useAuth } from "@/context/AuthContext";

const CategoryDetaisPage = () => {
  const params = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { authenticated } = useAuth();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const categorySlug = params?.slug;

      if (!categorySlug) {
        setError("Category not found");
        return;
      }

      const response = await GetCategories();

      const categories = response?.data?.data;

      if (!Array.isArray(categories)) {
        setError("Failed to load categories");
        return;
      }

      const category = categories.find(
        (cat: Category) => cat.slug === categorySlug,
      );

      if (!category) {
        setError("Category not found");
        return;
      }

      setCategoryName(category.name);

      const res = await GetCourses(category._id);
      if (res?.data?.data) {
        setCourses(res.data.data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [params?.slug]);

  const handleEnroll = async (courseId: string) => {
    try {
      if (!authenticated) {
        toast.warn("Login to Enroll");
        return;
      }
      const response = await EnrollCourse(courseId);
      const data = response.data.data;
      if (response.status === 200) {
        fetchCourses();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (loading) {
    return (
      <div className={style.loading}>
        <p>Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <h1>Courses in {categoryName || "this Category"}</h1>

      {courses.length === 0 ? (
        <p className={style.notFound}>No courses found in this category</p>
      ) : (
        <div className={style.cardContainer}>
          {courses.map((course) => (
            <Card
              key={course._id}
              title={course.title}
              description={course.description}
              category={course.category}
              slug={course.slug}
              image={course.thumbnail || "/course.webp"}
              fromCats
              handleEnroll={() => handleEnroll(course._id)}
              isAuthenticated={authenticated}
              isEnrolled={course.isEnrolled}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDetaisPage;
