import CategoriesModel from "@/app/models/CategoriesModel";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: {
    params: { id: string };
  },
) {
  try {
    const { id } = await context.params;
    await CategoriesModel.findByIdAndDelete(id);
    return ApiSuccess("Category deleted succesfully");
  } catch (error) {
    console.log(error);
    return ApiError("server error");
  }
}
