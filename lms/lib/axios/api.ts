import axiosInstance from "./axios";

export const GetCourses = () => {
  return axiosInstance.get("courses");
};

export const GetLessonsByCourseId = (id: string) => {
  return axiosInstance.get("courses");
};
