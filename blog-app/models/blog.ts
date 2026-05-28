import mongoose, { Schema, Document } from "mongoose";

interface IBlogs extends Document {
  title: string;
  description: string;
  content: string;
  author: mongoose.Types.ObjectId;
  thumbnail: string;
  images: string[];
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogSchema = new Schema<IBlogs>(
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
  mongoose.model<IBlogs>("Blogs", BlogSchema);
