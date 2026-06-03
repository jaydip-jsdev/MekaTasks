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

    const { title, slug, description, category }: CourseBody = await req.json();

    if (!title || !slug || !description)
      return ApiError("All the fields are required", 401);

    if (!category) return ApiError("Category is required", 401);

    const categoryExist = await CategoriesModel.findOne({ name: category });

    if (!categoryExist) return ApiError("This category doesn't exist", 401);

    const existingCourse = await CourseModel.findOne({ slug });
    if (existingCourse) return ApiError("Course with this slug already exist");

    const NewCourse = {
      title,
      slug,
      description,
      category: categoryExist._id,
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
