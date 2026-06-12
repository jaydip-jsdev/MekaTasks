import UserModel from "@/app/models/UsersModel";
import { ApiError, ApiSuccess } from "@/lib/response/api-response";
import ConnectDB from "@/lib/database/db";
import { GenerateToken } from "@/lib/jwt/jwt";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

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

    const response = NextResponse.json(
      {
        success: true,
        message: "User Logged in Successfully",
        user: userData,
      },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);

    return ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
    );
  }
}
