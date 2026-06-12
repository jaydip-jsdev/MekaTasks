import CategoriesModel from "@/app/models/CategoriesModel";
import { ApiError, ApiSuccess } from "@/lib/response/api-response";
import ConnectDB from "@/lib/database/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();
    const categories = await CategoriesModel.find({});
    return ApiSuccess("Categories fetched successfully", categories);
  } catch (error) {
    console.log(error);
    return ApiError("server error");
  }
}
