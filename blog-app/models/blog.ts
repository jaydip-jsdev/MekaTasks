import IBlog from "@/Types/Blog.model";
import mongoose, { Schema, Document } from "mongoose";

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    thumbnail: {
      type: String,
    },
    images: {
      type: [String],
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Blogs ||
  mongoose.model<IBlog>("Blogs", BlogSchema);
