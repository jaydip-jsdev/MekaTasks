import { verifyToken } from "@/lib/jwt";
import { ConnectDb } from "@/lib/monogoose";
import Blog from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await ConnectDb();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "unauthorized",
        },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);
    const { id } = await params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({
        success: false,
        message: "blog not found",
      });
    }

    if (blog.author.toString() !== decoded.userId) {
      return NextResponse.json({
        success: false,
        message: "you can delete your blog only",
      });
    }

    await Blog.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "blog deleted successfull",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
