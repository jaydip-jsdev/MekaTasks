import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
});

interface BlogPayload {
  title: string;
  description: string;
  content: string;
}

export const Register = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("register", data);
};

export const Login = (data: { email: string; password: string }) => {
  return api.post("login", data);
};

export const Logout = () => {
  return api.post("logout");
};

export const GetAllBlogs = () => {
  return api.get("blog");
};

export const GetBlogById = (id: string) => {
  return api.get("blog/" + id);
};

export const GetMyBlogs = () => {
  return api.get("blog/my");
};

export const AddNewBlog = (data: BlogPayload) => {
  return api.post("blog/create", data);
};

export const UpdateBlog = (id: string, data: BlogPayload) => {
  return api.patch("blog/edit/" + id, data);
};

export const DeleteBlog = (id: string) => {
  return api.delete("blog/delete/" + id);
};
