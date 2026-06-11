import { Document, Types } from "mongoose";

interface IBlog extends Document {
  title: string;
  description: string;
  content: string;
  author: Types.ObjectId;
  thumbnail: string;
  images: string[];
  category: string;
  likes: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default IBlog;
