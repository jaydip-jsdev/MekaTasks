import { ApiError, ApiSuccess } from "@/lib/api-response";
import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";
import LessonsModel from "@/app/models/LessonsModel";
import CourseModel from "@/app/models/CourseModel";
import ConnectDB from "@/lib/db";
import mongoose from "mongoose";
import { AdminAuth } from "@/lib/adminAuth";

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

    const course = await CourseModel.findById(courseId);

    if (!course) {
      return ApiError("Course not found", 404);
    }

    const bytes = await lesson.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uplaodDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uplaodDir, { recursive: true });

    const fileName = `${Date.now()}~${lesson.name}`;
    const filePath = path.join(uplaodDir, fileName);

    await fs.writeFile(filePath, buffer);

    const video_url = `/uploads/${fileName}`;

    const NewLesson = {
      courseId,
      title,
      description,
      slug,
      video_url,
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
