import { Course } from "@/Types/courses";
import mongoose, { models, Schema } from "mongoose";

export const CourseSchema = new Schema<Course>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Lesson",
      },
    ],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    thumbnail: {
      type: String,
    },
    totalLessons: {
      type: Number,
    },
    enrolledStudents: {
      type: Number,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default models.Course || mongoose.model<Course>("Course", CourseSchema);
