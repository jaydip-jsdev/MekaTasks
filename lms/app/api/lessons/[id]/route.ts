import LessonsModel from "@/app/models/LessonsModel";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";
import { NextRequest } from "next/server";

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

    const { id } = await context.params;

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const slug = formData.get("slug");
    const courseId = formData.get("courseId");
    const lesson = formData.get("lesson");

    const updates: Record<string, any> = {};

    if (title !== null) updates.title = title;
    if (description !== null) updates.description = description;
    if (slug !== null) updates.slug = slug;
    if (courseId !== null) updates.courseId = courseId;
    if (lesson !== null) updates.lesson = lesson;

    if (slug) {
      const exist = await LessonsModel.findOne({ slug });
      if (exist) return ApiError("lesson already exist with slug " + slug, 400);
    }

    const dbLesson = await LessonsModel.findById(id);
    if (!dbLesson) return ApiError("Lesson not found", 404);

    const updatedLesson = await LessonsModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return ApiSuccess("Lesson Updated successfully", updatedLesson);
  } catch (error) {
    console.error(error);
    return ApiError("Server error", 500);
  }
}
