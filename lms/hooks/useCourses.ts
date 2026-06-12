"use client";

import { useAuth } from "@/context/AuthContext";
import { EnrollCourse, GetCourses } from "@/lib/axios/api";
import { getErrorMessage } from "@/lib/errorHandling/ClientError";
import { Course } from "@/Types/courses";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UseCoursesReturn {
  courses: Course[];
  loading: boolean;
  error: string;
  authenticated: boolean;
  fetchCourses: () => Promise<void>;
  handleEnroll: (courseId: string) => Promise<void>;
}

export const useCourses = (categoryId?: string): UseCoursesReturn => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { authenticated } = useAuth();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await GetCourses(categoryId);
      if (res.data.data) {
        setCourses(res.data.data);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    try {
      if (!authenticated) {
        toast.warn("Login to Enroll");
        return;
      }

      const response = await EnrollCourse(courseId);

      if (response.status === 200) {
        fetchCourses();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [categoryId]);

  return {
    courses,
    loading,
    error,
    authenticated,
    fetchCourses,
    handleEnroll,
  };
};
