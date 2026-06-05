import { IUser } from "@/Types/user";
import mongoose, { Schema } from "mongoose";

const UserScheam = new Schema<IUser>(
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
  mongoose.models.User || mongoose.model<IUser>("User", UserScheam);
export default UserModel;
