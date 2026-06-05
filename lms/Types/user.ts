import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "student" | "admin";
  avatar?: string;
  bio?: string;
  enrolledCourses: Types.ObjectId[];
}
