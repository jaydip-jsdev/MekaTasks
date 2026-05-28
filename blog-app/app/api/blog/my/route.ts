import { verifyToken } from "@/lib/jwt";
import { ConnectDb } from "@/lib/monogoose";
import Blog from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await ConnectDb();
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);
    const blogs = await Blog.find({
      author: decoded.userId,
    }).sort({ createAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: "blog found",
        data: blogs,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "SOmething went wrong",
      },
      { status: 200 },
    );
  }
}
