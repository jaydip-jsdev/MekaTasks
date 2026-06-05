import type { Category } from "./category";
import { Lesson } from "./Lesson";

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;

  category: Category | string;

  lessons: Lesson[];

  thumnail?: string;
  totalLessons?: number;
  enrolledStudents?: number;
  isPublished: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCoursePayload {
  title: string;
  description: string;
  slug: string;
  category: string;
}
