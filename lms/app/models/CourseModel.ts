import mongoose, { models, Schema, Types } from "mongoose";

interface ICourse {
  title: string;
  slug: string;
  description: string;
  category: Types.ObjectId;
  lessons: Types.ObjectId[];
  thumnail?: string;
  totalLessons?: number;
  enrolledStudents?: number;
  isPublished: boolean;
}

export const CourseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
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
    thumnail: {
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

export default models.Course || mongoose.model<ICourse>("Course", CourseSchema);
