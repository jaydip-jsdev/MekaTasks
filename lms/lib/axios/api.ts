import { LoginPayload, RegisterPayload } from "@/Types/auth";
import axiosInstance from "./axios";
import { CreateCategoryPayload } from "@/Types/category";
import endpoints from "./endpoints";

// auth
const auth = endpoints.auth;
export const register = (payload: RegisterPayload) => {
  return axiosInstance.post(auth.register, payload);
};

export const login = (payload: LoginPayload) => {
  return axiosInstance.post(auth.login, payload);
};

export const logout = () => {
  return axiosInstance.post(auth.logout);
};

// courses crud
const course = endpoints.courses;
export const GetCourses = (catId?: string, search?: string) => {
  const params = new URLSearchParams();

  if (catId) params.append("categoryId", catId);

  if (search) params.append("search", search);

  let endpoint = course.list;

  if (params.toString()) endpoint += `?${params.toString()}`;

  return axiosInstance.get(endpoint);
};

export const getCourseDetails = (slug: string) => {
  return axiosInstance.get(course.details(slug));
};

export const AddCourse = (payload: FormData) => {
  return axiosInstance.post(course.create, payload);
};

export const EditCourse = (slug: string, payload: FormData) => {
  return axiosInstance.patch(course.update(slug), payload);
};

export const DeleteCourse = (slug: string) => {
  return axiosInstance.delete(course.delete(slug));
};

export const EnrollCourse = (courseId: string) => {
  return axiosInstance.post(course.enroll, { courseId });
};

export const enrolledCourses = () => {
  return axiosInstance.get(course.enrolled);
};

// categories crud
const cats = endpoints.categories;
export const addCategory = (payload: CreateCategoryPayload) => {
  return axiosInstance.post(cats.create, payload);
};

export const GetCategories = () => {
  return axiosInstance.get(cats.list);
};

export const DeleteCategories = (id: string) => {
  return axiosInstance.delete(cats.delete(id));
};

// lessons crud
const lessons = endpoints.lessons;
export const UploadLesson = (payload: FormData) => {
  return axiosInstance.post(lessons.create, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const GetLessonById = (id: string) => {
  return axiosInstance.get(lessons.details(id));
};

export const EditLesson = (id: string, payload: FormData) => {
  return axiosInstance.patch(lessons.update(id), payload);
};

export const DeleteLesson = (id: string) => {
  return axiosInstance.delete(lessons.delete(id));
};

// History crud
const history = endpoints.history;
export const AddToHistory = (lessonId: string) => {
  return axiosInstance.post(history.add(lessonId));
};

export const getHistory = () => {
  return axiosInstance.get(history.list);
};
