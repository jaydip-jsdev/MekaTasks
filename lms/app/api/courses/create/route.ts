import CategoriesModel from "@/app/models/CategoriesModel";
import CourseModel from "@/app/models/CourseModel";
import { AdminAuth } from "@/lib/adminAuth";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import { uploadToCloud } from "@/lib/cloudinary/UploadToCloud";
import ConnectDB from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();

    const auth = await AdminAuth(req);
    if (!auth.status) {
      return ApiError(auth.message || "Admin access required", auth.status);
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    const thumbnail = formData.get("thumbnail") as File;

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

    if (!thumbnail || thumbnail.size === 0) {
      return ApiError("Thumbnail is required");
    }
    const categoryExist = await CategoriesModel.findOne({
      _id: sanitizedCategory,
    });

    if (!categoryExist) return ApiError("This category doesn't exist", 401);

    const existingCourse = await CourseModel.findOne({ slug: sanitizedSlug });
    if (existingCourse) return ApiError("Course with this slug already exist");

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

    const NewCourse = {
      title: sanitizedTitle,
      slug: sanitizedSlug,
      description: sanitizedDescription,
      category: sanitizedCategory,
      thumbnail: uploadedThumbnail.secure_url,
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
