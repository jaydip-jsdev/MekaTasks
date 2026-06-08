import { LoginPayload, RegisterPayload } from "@/Types/auth";
import axiosInstance from "./axios";
import { CreateCategoryPayload } from "@/Types/category";

// auth
export const register = (payload: RegisterPayload) => {
  return axiosInstance.post("register", payload);
};

export const login = (payload: LoginPayload) => {
  return axiosInstance.post("login", payload);
};

export const logout = () => {
  return axiosInstance.post("logout");
};

// courses crud
export const GetCourses = (catId?: string, search?: string) => {
  const params = new URLSearchParams();

  if (catId) {
    params.append("categoryId", catId);
  }

  if (search) {
    params.append("search", search);
  }

  const endpoint = params.toString()
    ? `courses?${params.toString()}`
    : "courses";

  return axiosInstance.get(endpoint);
};

export const getCourseDetails = (slug: string) => {
  return axiosInstance.get("courses/" + slug);
};

export const AddCourse = (payload: FormData) => {
  return axiosInstance.post("courses/create", payload);
};

export const EditCourse = (slug: string, payload: FormData) => {
  return axiosInstance.patch("courses/" + slug, payload);
};

export const DeleteCourse = (slug: string) => {
  return axiosInstance.delete("courses/" + slug);
};

export const EnrollCourse = (courseId: string) => {
  return axiosInstance.post("courses/enroll", { courseId });
};

export const enrolledCourses = () => {
  return axiosInstance.get("my/enrolledcourses");
};

// categories crud
export const addCategory = (payload: CreateCategoryPayload) => {
  return axiosInstance.post("categories/create", payload);
};

export const GetCategories = () => {
  return axiosInstance.get("categories");
};

export const DeleteCategories = (id: string) => {
  return axiosInstance.delete("categories/" + id);
};

// lessons crud
export const UploadLesson = (payload: FormData) => {
  return axiosInstance.post("lessons/create", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const GetLessonById = (id: string) => {
  return axiosInstance.get("lessons/" + id);
};

export const EditLesson = (id: string, payload: FormData) => {
  return axiosInstance.patch("lessons/" + id, payload);
};

export const DeleteLesson = (id: string) => {
  return axiosInstance.delete("lessons/" + id);
};

// History crud
export const AddToHistory = (lessonId: string) => {
  return axiosInstance.post("my/history/" + lessonId);
};

export const getHistory = () => {
  return axiosInstance.get("my/history");
};
