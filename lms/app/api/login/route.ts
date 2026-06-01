import UserModel from "@/app/models/UsersModel";
import { ApiError, ApiSuccess } from "@/lib/api-response";
import ConnectDB from "@/lib/db";
import { GenerateToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

interface UserBody {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const { email, password }: UserBody = await req.json();
    if (!email || !password) {
      return ApiError("Email & Password required", 401);
    }

    const user = await UserModel.findOne({ email });

    if (!user) return ApiError("User not found", 404);

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) return ApiError("email or passoword wrong", 401);

    const token = GenerateToken(user._id.toString(), user.email, user.role);

    const userData = user.toObject();
    delete userData.password;

    return ApiSuccess("User Logged in Successfull", {
      token,
      user: userData,
    });
  } catch (error) {
    console.error(error);

    return ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
    );
  }
}
