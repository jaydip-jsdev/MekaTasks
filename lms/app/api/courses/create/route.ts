import CategoriesModel from "@/app/models/CategoriesModel";
import CourseModel from "@/app/models/CourseModel";
import { AdminAuth } from "@/lib/adminAuth";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";
import { NextRequest } from "next/server";

interface CourseBody {
  title: string;
  slug: string;
  description: string;
  category: string;
}

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();

    const auth = await AdminAuth(req);
    if (!auth.status) {
      return ApiError(auth.message || "Admin access required", auth.status);
    }

    const { title, slug, description, category }: CourseBody = await req.json();

    const sanitizedTitle = title?.trim();
    const sanitizedSlug = slug?.trim().toLowerCase();
    const sanitizedDescription = description?.trim();
    const sanitizedCategory = category?.trim();

    if (
      !sanitizedTitle ||
      !sanitizedSlug ||
      !sanitizedDescription ||
      !sanitizedCategory
    ) {
      return ApiError("All fields are required", 401);
    }
    const categoryExist = await CategoriesModel.findOne({
      _id: sanitizedCategory,
    });

    if (!categoryExist) return ApiError("This category doesn't exist", 401);

    const existingCourse = await CourseModel.findOne({ slug: sanitizedSlug });
    if (existingCourse) return ApiError("Course with this slug already exist");

    const NewCourse = {
      title: sanitizedTitle,
      slug: sanitizedSlug,
      description: sanitizedDescription,
      category: sanitizedCategory,
    };

    const course = await CourseModel.create(NewCourse);
    const populatedCourse = await CourseModel.findById(course._id).populate(
      "category",
    );

    return ApiSuccess("Course Created Successfully", populatedCourse);
  } catch (error) {
    console.error(error);

    return ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
    );
  }
}
