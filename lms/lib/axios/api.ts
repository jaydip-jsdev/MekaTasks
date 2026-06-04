import axiosInstance from "./axios";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
export const register = (payload: RegisterPayload) => {
  return axiosInstance.post("register", payload);
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

export const GetCourses = (catId: string) => {
  let endpoint = catId ? `courses?categoryId=${catId}` : "courses";
  return axiosInstance.get(endpoint);
};

export const getCourseDetails = (slug: string) => {
  return axiosInstance.get("courses/" + slug);
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

export const DeleteCategories = (id: string) => {
  return axiosInstance.delete("categories/" + id);
};

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
