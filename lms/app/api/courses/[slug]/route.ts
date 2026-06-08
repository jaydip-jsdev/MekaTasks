import CategoriesModel from "@/app/models/CategoriesModel";
import CourseModel from "@/app/models/CourseModel";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";
import { NextRequest } from "next/server";
import "@/app/models/LessonsModel";
import { AdminAuth } from "@/lib/adminAuth";
import { uploadToCloud } from "@/lib/cloudinary/UploadToCloud";
import LessonsModel from "@/app/models/LessonsModel";
import HistoryModel from "@/app/models/HistoryModel";

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
    params: Promise<{ slug: string }>;
  },
) {
  try {
    await ConnectDB();

    const auth = await AdminAuth(req);

    if (!auth.status) {
      return ApiError(auth.message || "Admin access required", 401);
    }

    const { slug } = await context.params;

    const course = await CourseModel.findOne({ slug });

    if (!course) {
      return ApiError("Course not found", 404);
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const thumbnail = formData.get("thumbnail") as File | null;

    const updateData: Record<string, any> = {};

    if (title?.trim()) {
      updateData.title = title.trim();
    }

    if (description?.trim()) {
      updateData.description = description.trim();
    }

    if (category?.trim()) {
      const categoryExist = await CategoriesModel.findById(category);

      if (!categoryExist) {
        return ApiError("Category not found", 404);
      }

      updateData.category = category;
    }

    if (thumbnail && thumbnail.size > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(thumbnail.type)) {
        return ApiError("Invalid image format");
      }

      const MAX_SIZE = 5 * 1024 * 1024;

      if (thumbnail.size > MAX_SIZE) {
        return ApiError("Image size must be less than 5MB");
      }

      const uploadedThumbnail = await uploadToCloud(thumbnail, {
        folder: "courses",
        resourceType: "image",
      });

      updateData.thumbnail = uploadedThumbnail.secure_url;
    }

    const updatedCourse = await CourseModel.findOneAndUpdate(
      { slug },
      updateData,
      {
        new: true,
      },
    ).populate("category");

    return ApiSuccess("Course Updated Successfully", updatedCourse);
  } catch (error) {
    console.error(error);

    return ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
    );
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

    const course = await CourseModel.findOne({ slug });

    if (!course) return ApiError("Course not found", 404);

    const lessons = await LessonsModel.find({
      courseId: course._id,
    }).select("_id");

    const lessonIds = lessons.map((l) => l._id);

    await HistoryModel.deleteMany({
      lesson: { $in: lessonIds },
    });

    await LessonsModel.deleteMany({
      courseId: course._id,
    });

    await CourseModel.findByIdAndDelete(course._id);

    return ApiSuccess("Course Deleted successfully");
  } catch (error) {
    console.error(error);
    return ApiError("Internal server error", 500);
  }
}
