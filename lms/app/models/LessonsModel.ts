import { Lesson } from "@/Types/Lesson";
import mongoose, { models, Schema } from "mongoose";

const LessonSchema = new Schema<Lesson>(
  {
    courseId: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    video_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default models.Lesson || mongoose.model<Lesson>("Lesson", LessonSchema);
