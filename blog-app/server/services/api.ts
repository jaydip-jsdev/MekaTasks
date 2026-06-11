import { BlogPayload } from "@/Types/Blog";
import { loginPayload, registerPayload } from "@/Types/authPayload";

import api from "./axios";
import endpoints from "./endpoints";

export const Register = (data: registerPayload) => {
  return api.post(endpoints.register, data);
};

export const Login = (data: loginPayload) => {
  return api.post(endpoints.login, data);
};

export const Logout = () => {
  return api.post(endpoints.logout);
};

export const GetAllBlogs = () => {
  return api.get(endpoints.blog);
};

export const GetBlogById = (id: string) => {
  return api.get(`${endpoints.blogById}${id}`);
};

export const GetMyBlogs = () => {
  return api.get(endpoints.myBlogs);
};

export const AddNewBlog = (data: BlogPayload) => {
  return api.post(endpoints.createBlog, data);
};

export const UpdateBlog = (id: string, data: BlogPayload) => {
  return api.patch(`${endpoints.updateBlog}${id}`, data);
};

export const DeleteBlog = (id: string) => {
  return api.delete(`${endpoints.deleteBlog}${id}`);
};
