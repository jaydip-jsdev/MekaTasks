import UserModel from "@/app/models/UsersModel";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";
import { VerifyToken } from "@/lib/jwt";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return ApiError("Unauthorized", 401);
    }

    const decoded = await VerifyToken(token);

    const user = await UserModel.findById(decoded.id).populate({
      path: "enrolledCourses",
      populate: {
        path: "category",
        select: "name slug",
      },
    });

    if (!user) {
      return ApiError("User not found", 404);
    }

    return ApiSuccess("Courses fetched successfully", user.enrolledCourses);
  } catch (error) {
    console.log(error);
    return ApiError("Server Error", 500);
  }
}
