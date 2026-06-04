import mongoose, { models, Schema } from "mongoose";

interface ICategories {
  name: string;
  slug: string;
  icon: string;
}

const CategorySchema = new Schema<ICategories>(
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
  mongoose.model<ICategories>("Category", CategorySchema);
