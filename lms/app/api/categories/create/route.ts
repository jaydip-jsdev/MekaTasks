import CategoriesModel from "@/app/models/CategoriesModel";
import { AdminAuth } from "@/lib/adminAuth";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";
import { NextRequest } from "next/server";

interface RequestBody {
  name: string;
  slug: string;
}

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const auth = await AdminAuth(req);

    if (!auth.success) {
      return ApiError(auth.message!, auth.status);
    }

    const { name, slug }: RequestBody = await req.json();

    if (!name || !slug) {
      return ApiError("Name & slug required", 401);
    }

    const category = name.toLocaleLowerCase();
    const exist = await CategoriesModel.findOne({ name: category });

    if (exist) return ApiError("this category already exist");

    const NewCategory = {
      name,
      slug,
    };

    await CategoriesModel.create(NewCategory);

    return ApiSuccess("Category created", NewCategory);
  } catch (error) {
    console.error(error);

    return ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
    );
  }
}
