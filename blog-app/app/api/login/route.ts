import { generateToken } from "@/lib/jwt";
import { ConnectDb } from "@/lib/monogoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await ConnectDb();
    const { email, password } = await req.json();
    const exist = await User.findOne({ email }).select("+password");
    if (!exist) {
      return NextResponse.json({
        success: false,
        message: "user not found",
      });
    }

    const checkPassword = await bcrypt.compare(password, exist.password);

    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Email or password wrong",
      });
    }

    const token = generateToken({
      userId: exist._id,
      email: exist.email,
    });

    const response = NextResponse.json({
      success: true,
      message: "Login success",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
}
