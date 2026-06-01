import CourseModel from "@/app/models/CourseModel";
import "@/app/models/CategoriesModel"; // Register Category model for populate
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";

export async function GET() {
  try {
    await ConnectDB();

    const courses = await CourseModel.find({
      isPublished: true,
    })
      .populate("category")
      .lean();

    return ApiSuccess("Courses fetched successfully", courses);
  } catch (error) {
    console.error(error);

    return ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
    );
  }
}
