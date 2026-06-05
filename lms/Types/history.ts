import { Types } from "mongoose";

export interface ILessonHistory {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  lesson: Types.ObjectId;
  course: Types.ObjectId;
  watchedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
