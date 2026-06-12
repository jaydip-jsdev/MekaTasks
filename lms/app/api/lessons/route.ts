import LessonsModel from "@/app/models/LessonsModel";
import { ApiError, ApiSuccess } from "@/lib/response/api-response";
import ConnectDB from "@/lib/database/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();

    const courseId = req.nextUrl.searchParams.get("courseId");
    if (!courseId) return ApiError("CourseId is required", 400);

    const lessons = await LessonsModel.find({ courseId });

    if (lessons.length === 0) {
      return ApiError("No lessons found for this course", 404);
    }
    return ApiSuccess("Lesssons fetched successful", lessons, 200);
  } catch (error) {
    console.error(error);
    return ApiError("Internal Server Error", 500);
  }
}
