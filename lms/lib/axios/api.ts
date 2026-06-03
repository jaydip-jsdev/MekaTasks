import axiosInstance from "./axios";

export const GetCourses = () => {
  return axiosInstance.get("courses");
};

export const getCourseDetails = (slug: string) => {
  return axiosInstance.get("courses/" + slug);
};

interface LoginPayload {
  email: string;
  password: string;
}

export const login = (payload: LoginPayload) => {
  return axiosInstance.post("login", payload);
};

export const logout = () => {
  return axiosInstance.post("logout");
};

interface CoursePayload {
  title: string;
  description: string;
  slug: string;
  category: string;
}

export const AddCourse = (payload: CoursePayload) => {
  return axiosInstance.post("courses/create", payload);
};

export const EditCourse = (slug: string, payload: CoursePayload) => {
  return axiosInstance.patch("courses/" + slug, payload);
};

export const DeleteCourse = (slug: string) => {
  return axiosInstance.delete("courses/" + slug);
};

interface categoryPayload {
  name: string;
  slug: string;
}

export const addCategory = (payload: categoryPayload) => {
  return axiosInstance.post("categories/create", payload);
};

export const GetCategories = () => {
  return axiosInstance.get("categories");
};

export const UploadLesson = (payload: FormData) => {
  return axiosInstance.post("lessons/create", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
