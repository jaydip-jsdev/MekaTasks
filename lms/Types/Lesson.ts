import { Types } from "mongoose";

export interface Lesson {
  thumbnail: string;
  _id: string;
  courseId: Types.ObjectId | string | {};
  title: string;
  description: string;
  slug?: string;
  video_url: string;
  createdAt?: string;
  updatedAt?: string;
}
