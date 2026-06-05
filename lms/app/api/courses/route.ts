import CourseModel from "@/app/models/CourseModel";
import "@/app/models/CategoriesModel";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";
import { NextRequest } from "next/server";
import { VerifyToken } from "@/lib/jwt";
import UserModel from "@/app/models/UsersModel";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();
    const token = req.cookies.get("token")?.value;

    let enrolledCourseIds: string[] = [];

    if (token) {
      const decode = VerifyToken(token);
      const user = await UserModel.findById(decode.id).select(
        "enrolledCourses",
      );

      enrolledCourseIds =
        user?.enrolledCourses.map((id: any) => id.toString()) || [];
    }

    const categoryId = req.nextUrl?.searchParams.get("categoryId");
    const filter = categoryId ? { category: categoryId } : {};
    const courses = await CourseModel.find(filter).populate("category").lean();

    const courseWithStatus = courses.map((c) => ({
      ...c,
      isEnrolled: enrolledCourseIds.includes(c._id.toString()),
    }));

    return ApiSuccess("Courses fetched successfully", courseWithStatus);
  } catch (error) {
    console.error(error);

    return ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
    );
  }
}
