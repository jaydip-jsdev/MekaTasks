import LessonsModel from "@/app/models/LessonsModel";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";

import { NextRequest } from "next/server";
import CourseModel from "@/app/models/CourseModel";
import { AdminAuth } from "@/lib/adminAuth";
import { uploadToCloud } from "@/lib/cloudinary/UploadToCloud";

export async function GET(
  req: NextRequest,
  context: {
    params: { id: string };
  },
) {
  try {
    await ConnectDB();
    const { id } = await context.params;

    if (!id) {
      return ApiError("Id is required", 400);
    }

    const lesson = await LessonsModel.findById(id);

    if (!lesson) return ApiError("LEsson not foudn with this id", 404);

    return ApiSuccess("Kesson fetched successfully", lesson, 200);
  } catch (error) {
    console.log(error);
    return ApiError("Internal server ierror");
  }
}

export async function PATCH(
  req: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await ConnectDB();

    const auth = await AdminAuth(req);

    if (!auth.status) {
      return ApiError(
        auth.message || "Authentication error",
        auth.status || 401,
      );
    }

    const { id } = await context.params;

    if (!id) {
      return ApiError("Lesson ID is required", 400);
    }

    const dbLesson = await LessonsModel.findById(id);

    if (!dbLesson) {
      return ApiError("Lesson not found", 404);
    }

    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const slug = formData.get("slug") as string | null;
    const courseId = formData.get("courseId") as string | null;

    const lesson = formData.get("lesson") as File | null;
    const thumbnail = formData.get("thumbnail") as File | null;

    const updates: Record<string, any> = {};

    if (title?.trim()) {
      updates.title = title.trim();
    }

    if (description?.trim()) {
      updates.description = description.trim();
    }

    if (slug?.trim()) {
      const exist = await LessonsModel.findOne({
        slug: slug.trim(),
        _id: { $ne: id },
      });

      if (exist) {
        return ApiError(`Lesson already exists with slug ${slug}`, 400);
      }

      updates.slug = slug.trim();
    }

    if (courseId?.trim()) {
      const course = await CourseModel.findById(courseId);

      if (!course) {
        return ApiError("Course not found", 404);
      }

      updates.courseId = courseId;
    }

    // Upload new video
    if (lesson && lesson.size > 0) {
      if (!lesson.type.startsWith("video/")) {
        return ApiError("Only video files are allowed", 400);
      }

      const uploadedVideo = await uploadToCloud(lesson, {
        folder: "mekalearn/lessons",
        resourceType: "video",
      });

      updates.video_url = uploadedVideo.secure_url;
    }

    // Upload new thumbnail
    if (thumbnail && thumbnail.size > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(thumbnail.type)) {
        return ApiError("Invalid image format", 400);
      }

      const MAX_SIZE = 5 * 1024 * 1024;

      if (thumbnail.size > MAX_SIZE) {
        return ApiError("Image size must be less than 5MB", 400);
      }

      const uploadedThumbnail = await uploadToCloud(thumbnail, {
        folder: "mekalearn/thumbnails",
        resourceType: "image",
      });

      updates.thumbnail = uploadedThumbnail.secure_url;
    }

    if (courseId && courseId.toString() !== dbLesson.courseId.toString()) {
      await CourseModel.findByIdAndUpdate(dbLesson.courseId, {
        $pull: {
          lessons: dbLesson._id,
        },
      });

      await CourseModel.findByIdAndUpdate(courseId, {
        $push: {
          lessons: dbLesson._id,
        },
      });
    }

    const updatedLesson = await LessonsModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return ApiSuccess("Lesson updated successfully", updatedLesson, 200);
  } catch (error) {
    console.error(error);

    return ApiError(
      error instanceof Error ? error.message : "Server Error",
      500,
    );
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
    if (!auth.success) {
      return ApiError(auth.message || "Access Denied", auth.status);
    }

    const { id } = await context.params;

    await LessonsModel.findByIdAndDelete(id);
    return ApiSuccess("deleted");
  } catch (error) {
    console.error(error);
    return ApiError("Server error");
  }
}
