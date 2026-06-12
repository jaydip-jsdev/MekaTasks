import { Category } from "@/Types/category";
import mongoose, { models, Schema } from "mongoose";

const CategorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true },
);

export default models.Category ||
  mongoose.model<Category>("Category", CategorySchema);
