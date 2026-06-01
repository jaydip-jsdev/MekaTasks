import mongoose, { model, models, Schema, Types } from "mongoose";

interface ILessons {
  courseId: Types.ObjectId;
  title: string;
  description: string;
  slug?: string;
  video_url: string;
}

const LessonSchema = new Schema<ILessons>(
  {
    courseId: {
      type: mongoose.Schema.ObjectId,
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

export default models.Lesson ||
  mongoose.model<ILessons>("Lesson", LessonSchema);
