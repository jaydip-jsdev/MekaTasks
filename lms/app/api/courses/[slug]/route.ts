import CategoriesModel from "@/app/models/CategoriesModel";
import CourseModel from "@/app/models/CourseModel";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";
import { NextRequest } from "next/server";
import "@/app/models/LessonsModel";
import { AdminAuth } from "@/lib/adminAuth";

export async function GET(
  req: NextRequest,
  context: {
    params: Promise<{ slug: string }>;
  },
) {
  try {
    await ConnectDB();
    const { slug } = await context.params;

    let course = await CourseModel.findOne({ slug }).populate("lessons");

    if (!course) {
      return ApiError("Course not found", 404);
    }

    return ApiSuccess("Course Fetched Successfully", course);
  } catch (error) {
    console.log(error);
    return ApiError("Internal Server Error", 500);
  }
}

export async function PATCH(
  req: NextRequest,
  context: {
    params: { slug: string };
  },
) {
  try {
    await ConnectDB();

    const auth = AdminAuth(req);

    if (!auth.success)
      return ApiError(auth.message || "Admin Access required", 501);

    const { slug } = await context.params;

    if (!slug) {
      return ApiError("Id is required", 401);
    }

    const { title, description, categoryId } = await req.json();

    if (categoryId) {
      const categoryExist = await CategoriesModel.findById(categoryId);

      if (!categoryExist) return ApiError("Category not found", 401);
    }

    const updatedCourse = await CourseModel.findOneAndUpdate(
      { slug },
      {
        title,
        description,
        category: categoryId,
      },
      {
        new: true,
      },
    );

    if (!updatedCourse) {
      return ApiError("Course not found", 404);
    }

    return ApiSuccess("Course Updated successfull", updatedCourse);
  } catch (error) {
    console.log(error);
    return ApiError("Server error", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  context: {
    params: { slug: string };
  },
) {
  try {
    await ConnectDB();
    const auth = AdminAuth(req);
    if (!auth.success) return ApiError("Admin Access required", 501);

    const { slug } = await context.params;

    const course = await CourseModel.findOneAndDelete({ slug });

    if (!course) return ApiError("Course not found", 404);

    return ApiSuccess("Course Deleted successfully");
  } catch (error) {
    console.error(error);
    return ApiError("Internal server error", 500);
  }
}
