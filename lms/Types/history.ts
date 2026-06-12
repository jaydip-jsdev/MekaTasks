import { Types } from "mongoose";
import { Lesson } from "./Lesson";

export interface ILessonHistory {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  lesson: Types.ObjectId;
  course: Types.ObjectId;
  watchedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface History {
  _id: string;
  lesson: Lesson;
  createdAt: string;
}
