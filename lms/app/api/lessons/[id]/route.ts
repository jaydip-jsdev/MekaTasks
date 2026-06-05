import LessonsModel from "@/app/models/LessonsModel";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";

import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";
import CourseModel from "@/app/models/CourseModel";
import { AdminAuth } from "@/lib/adminAuth";

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
    params: { id: string };
  },
) {
  try {
    await ConnectDB();

    const auth = AdminAuth(req);
    if (!auth.success) {
      return ApiError(auth.message || "authentication error", auth.status || 401);
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

    const updates: Record<string, any> = {};

    if (title) updates.title = title;
    if (description) updates.description = description;
    if (courseId) updates.courseId = courseId;

    if (slug) {
      const exist = await LessonsModel.findOne({
        slug,
        _id: { $ne: id },
      });

      if (exist) {
        return ApiError("Lesson already exists with slug " + slug, 400);
      }

      updates.slug = slug;
    }

    if (lesson && lesson.size > 0) {
      if (!lesson.type.startsWith("video/")) {
        return ApiError("Only video files are allowed", 400);
      }

      const bytes = await lesson.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const fileName = `${Date.now()}~${lesson.name}`;
      const filePath = path.join(uploadDir, fileName);

      await fs.writeFile(filePath, buffer);

      if (dbLesson.video_url) {
        try {
          const oldFilePath = path.join(
            process.cwd(),
            "public",
            dbLesson.video_url,
          );

          await fs.unlink(oldFilePath);
        } catch (err) {
          console.log("Old file not found");
        }
      }

      updates.video_url = `/uploads/${fileName}`;
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
