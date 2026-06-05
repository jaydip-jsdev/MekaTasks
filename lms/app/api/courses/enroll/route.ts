import UserModel from "@/app/models/UsersModel";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";
import { VerifyToken } from "@/lib/jwt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) return ApiError("token required", 501);

    const decoded = VerifyToken(token);
    const userId = decoded.id;

    const { courseId } = await req.json();

    if (!courseId) return ApiError("Course Id is required");
    if (!userId) return ApiError("User Id is required");

    const enroll = await UserModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          enrolledCourses: courseId,
        },
      },
      { new: true },
    );

    if (!enroll) return ApiError("User not found");

    return ApiSuccess("User enrolled successfully", enroll);
  } catch (error) {
    console.log(error);
    return ApiError("Server Error");
  }
}
