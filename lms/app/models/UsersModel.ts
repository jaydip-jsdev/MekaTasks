import mongoose, { Schema, Types } from "mongoose";

interface IUsers {
  name: string;
  email: string;
  password: string;
  role: "student" | "admin";
  avatar?: string;
  bio?: string;
  enrolledCourses: Types.ObjectId[];
}

const UserScheam = new Schema<IUsers>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    enrolledCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true },
);

const UserModel =
  mongoose.models.User || mongoose.model<IUsers>("User", UserScheam);
export default UserModel;
