import CourseModel from "@/app/models/CourseModel";
import "@/app/models/CategoriesModel"; 
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();
    const categoryId = req.nextUrl?.searchParams.get("categoryId");
    const filter = categoryId ? { category: categoryId } : {};
    const courses = await CourseModel.find(filter).populate("category").lean();

    return ApiSuccess("Courses fetched successfully", courses);
  } catch (error) {
    console.error(error);

    return ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
    );
  }
}
