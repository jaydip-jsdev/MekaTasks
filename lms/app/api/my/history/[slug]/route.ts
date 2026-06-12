import HistoryModel from "@/app/models/HistoryModel";
import { ApiError, ApiSuccess } from "@/lib/response/api-response";
import ConnectDB from "@/lib/database/db";
import { VerifyToken } from "@/lib/jwt/jwt";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: { slug: string } },
) {
  try {
    await ConnectDB();
    const { slug } = await context.params;
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return ApiError("Aunauthorized", 401);
    }

    const decoded = await VerifyToken(token);
    const userId = decoded.id;

    await HistoryModel.findOneAndUpdate(
      {
        user: userId,
        lesson: slug,
      },
      {
        watchedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
      },
    );

    return ApiSuccess("History updated successfully");
  } catch (error) {
    console.log(error);
    return ApiError("Server error");
  }
}
