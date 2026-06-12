import CategoriesModel from "@/app/models/CategoriesModel";
import { AdminAuth } from "@/lib/auth/adminAuth";
import { ApiError, ApiSuccess } from "@/lib/response/api-response";
import ConnectDB from "@/lib/database/db";
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
    const slugExist = await CategoriesModel.findOne({ slug });

    if (exist) return ApiError("this category already exist");
    if (slugExist) return ApiError("This slug already exist");

    const NewCategory = {
      name: category,
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
