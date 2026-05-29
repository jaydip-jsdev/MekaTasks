import mongoose, { Document, Schema } from "mongoose";

interface LikeInterface extends Document {
  user: mongoose.Types.ObjectId;
  blog: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const LikeSchema = new Schema<LikeInterface>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  { timestamps: true },
);

LikeSchema.index({ user: 1, blog: 1 }, { unique: true });

export const LikesModal =
  mongoose.models.Like || mongoose.model<LikeInterface>("Like", LikeSchema);
