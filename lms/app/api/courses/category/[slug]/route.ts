import CourseModel from "@/app/models/CourseModel";
import { ApiError, ApiSuccess } from "@/lib/response/api-response";
import ConnectDB from "@/lib/database/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    ConnectDB();
    const { catId } = await req.json();
    const courses = await CourseModel.find({ category: catId });
    if (!courses) return ApiError("Courses not found with this category");
    return ApiSuccess("COurses fetched successfully for this caegory", courses);
  } catch (error) {
    console.log(error);
    return ApiError("server error");
  }
}
