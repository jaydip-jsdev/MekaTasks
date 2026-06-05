import CategoriesModel from "@/app/models/CategoriesModel";
import { AdminAuth } from "@/lib/adminAuth";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: {
    params: { id: string };
  },
) {
  try {
    const auth = await AdminAuth(req);
    
    if (!auth.status) {
      return ApiError(auth.message || "Admin access required", auth.status);
    }

    const { id } = await context.params;
    await CategoriesModel.findByIdAndDelete(id);
    return ApiSuccess("Category deleted succesfully");
  } catch (error) {
    console.log(error);
    return ApiError("server error");
  }
}
