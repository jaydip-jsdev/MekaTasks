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
    params: Promise<{ id: string }>;
  },
) {
  try {
    await ConnectDB();
    const { id } = await context.params;

    let course = await CourseModel.findById(id).populate("lessons");

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
    params: { id: string };
  },
) {
  try {
    await ConnectDB();

    const auth = AdminAuth(req);

    if (!auth.success)
      return ApiError(auth.message || "Admin Access required", 501);

    const { id } = await context.params;

    if (!id) {
      return ApiError("Id is required", 401);
    }

    const { title, slug, description, categoryId } = await req.json();

    if (categoryId) {
      const categoryExist = await CategoriesModel.findById(categoryId);

      if (!categoryExist) return ApiError("Category not found", 401);
    }

    const updatedCourse = await CourseModel.findByIdAndUpdate(
      id,
      {
        title,
        slug,
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
    params: { id: string };
  },
) {
  try {
    await ConnectDB();
    const auth = AdminAuth(req);
    if (!auth.success) return ApiError("Admin Access required", 501);

    const { id } = await context.params;

    const course = await CourseModel.findByIdAndDelete(id);

    if (!course) return ApiError("Course not found", 404);

    return ApiSuccess("Course Deleted successfully");
  } catch (error) {
    console.error(error);
    return ApiError("Internal server error", 500);
  }
}
