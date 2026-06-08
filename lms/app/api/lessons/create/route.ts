import { ApiError, ApiSuccess } from "@/lib/api-response";
import { NextRequest } from "next/server";
import LessonsModel from "@/app/models/LessonsModel";
import CourseModel from "@/app/models/CourseModel";
import ConnectDB from "@/lib/db";
import { AdminAuth } from "@/lib/adminAuth";
import { uploadToCloud } from "@/lib/cloudinary/UploadToCloud";

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();

    const auth = await AdminAuth(req);
    if (!auth.status) {
      return ApiError(auth.message || "Admin access required", auth.status);
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const slug = formData.get("slug") as string;
    const courseId = formData.get("courseId") as string;

    const exist = await LessonsModel.findOne({ slug });
    if (exist) return ApiError("lesson already exist with this " + slug, 400);

    if (!title || !description)
      return ApiError("Title & Description required", 400);

    if (!courseId) {
      return ApiError("Course ID is required", 400);
    }

    const lesson = formData.get("lesson") as File;

    if (!lesson) return ApiError("Lesson is required", 400);

    if (!lesson.type.startsWith("video/")) {
      return ApiError("Only video files are allowed", 400);
    }

    const thumbnail = formData.get("thumbnail") as File;

    if (!thumbnail) return ApiError("thumbnail is required");

    const cloudThumbnail = await uploadToCloud(thumbnail, {
      folder: "mekalearn/thumbnails",
      resourceType: "image",
    });

    const course = await CourseModel.findById(courseId);

    if (!course) {
      return ApiError("Course not found", 404);
    }

    const uploadedVideo = await uploadToCloud(lesson, {
      folder: "mekalearn/lessons",
      resourceType: "video",
    });

    const NewLesson = {
      thumbnail: cloudThumbnail.secure_url,
      courseId,
      title,
      description,
      slug,
      video_url: uploadedVideo.secure_url,
    };

    const createdLesson = await LessonsModel.create(NewLesson);
    await CourseModel.findByIdAndUpdate(courseId, {
      $push: {
        lessons: createdLesson._id,
      },
    });

    return ApiSuccess("Lesson uploaded successully", createdLesson);
  } catch (error) {
    console.error(error);

    return ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
    );
  }
}
