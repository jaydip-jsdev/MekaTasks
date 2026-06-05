import { ILessonHistory } from "@/Types/history";
import mongoose from "mongoose";

const LessonHistorySchema = new mongoose.Schema<ILessonHistory>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    watchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

LessonHistorySchema.index(
  {
    user: 1,
    lesson: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.models.lessonhistory ||
  mongoose.model<ILessonHistory>("lessonhistory", LessonHistorySchema);
