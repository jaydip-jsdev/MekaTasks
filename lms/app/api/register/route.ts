import UserModel from "@/app/models/UsersModel";
import { ApiError, ApiSuccess } from "@/lib/response/api-response";
import ConnectDB from "@/lib/database/db";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

interface UserBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const { name, email, password }: UserBody = await req.json();

    if (!name || !email || !password) {
      return ApiError("all the fields required", 400);
    }

    const normalizedEmail = email.toLowerCase();

    const exist = await UserModel.findOne({ email: normalizedEmail });
    if (exist) {
      return ApiError("User already exist with this email", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role =
      normalizedEmail === process.env.ADMIN_EMAIL ? "admin" : "student";

    const NewUser = {
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    };

    const user = await UserModel.create(NewUser);

    return ApiSuccess(
      "User Registered Successfully",
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      201,
    );
  } catch (error: unknown) {
    console.error(error);

    return ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
    );
  }
}
