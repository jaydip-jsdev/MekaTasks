import { ConnectDb } from "@/lib/monogoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await ConnectDb();
    const { name, email, password } = await req.json();

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "user already exist",
      });
    }

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    const dbUser = await User.create(user);

    const { password: _, ...safeUser } = dbUser.toObject();
    return NextResponse.json(
      {
        success: true,
        message: "User Registration Success",
        data: safeUser,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}