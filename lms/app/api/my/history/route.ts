import HistoryModel from "@/app/models/HistoryModel";
import { ApiError, ApiSuccess } from "@/lib/response/api-response";
import ConnectDB from "@/lib/database/db";
import { VerifyToken } from "@/lib/jwt/jwt";
import { NextRequest } from "next/server";
import "@/app/models/LessonsModel";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();
    const token = req.cookies.get("token")?.value;
    if (!token) return ApiError("Token not found");

    const decoded = await VerifyToken(token);
    const user = decoded.id;

    const history = await HistoryModel.find({ user })
      .populate({
        path: "lesson",
        populate: {
          path: "courseId",
          model: "Course",
        },
      })
      .sort({ updatedAt: -1 });

    return ApiSuccess("History fetched successfully", history, 200);
  } catch (error) {
    console.log(error);
    return ApiError("server error");
  }
}
