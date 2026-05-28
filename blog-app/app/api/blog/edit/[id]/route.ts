import { verifyToken } from "@/lib/jwt";
import { ConnectDb } from "@/lib/monogoose";
import Blog from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
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
          message: "unothorized",
        },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);

    const { title, description, content } = await req.json();
    const { id } = await params;
    const updatedBlog = {
      title,
      description,
      content,
    };

    const blog = await Blog.findByIdAndUpdate(id, updatedBlog, {
      returnDocument: "after",
    });

    if (!blog) {
      return NextResponse.json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== decoded.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You can only edit your own blog",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "blog updated success",
        data: blog,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "something went wrong",
      },
      { status: 500 },
    );
  }
}