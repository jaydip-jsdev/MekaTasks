"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GetCategories, GetCourses } from "@/lib/axios/api";
import style from "./style.module.css";
import Card from "@/app/components/card/Card";

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  thumnail?: string;
  totalLessons?: number;
  enrolledStudents?: number;
  isPublished: boolean;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const CategoryDetaisPage = () => {
  const params = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const categorySlug = params?.slug;
        if (!categorySlug) {
          setError("Category not found");
          setLoading(false);
          return;
        }

        const response = await GetCategories();
        const categoriesResponse = response.data.data;
        if (response.status !== 200) {
          throw new Error("Failed to fetch categories");
        }

        const category = categoriesResponse.find(
          (cat: Category) => cat.slug === categorySlug,
        );

        if (!category) {
          setError("Category not found");
          setLoading(false);
          return;
        }

        setCategoryName(category.name);

        const res = await GetCourses(category._id);

        if (response.status !== 200) {
          throw new Error("Failed to fetch courses");
        }

        setCourses(res.data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [params?.slug]);

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
              image="/course.webp"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDetaisPage;
