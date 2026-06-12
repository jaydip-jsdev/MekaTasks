import { Types } from "mongoose";
import { CourseRef } from "./courses";

export interface Lesson {
  thumbnail: string;
  _id: string;
  courseId: Types.ObjectId | string | CourseRef;
  title: string;
  description: string;
  slug?: string;
  video_url: string;
  createdAt?: string;
  updatedAt?: string;
}
