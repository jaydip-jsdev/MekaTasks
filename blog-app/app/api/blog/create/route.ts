import { verifyToken } from "@/lib/jwt";
import { ConnectDb } from "@/lib/monogoose";
import Blog from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await ConnectDb();
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const decoded = verifyToken(token);

    const { title, description, content } = await req.json();

    if (!title || !description || !content) {
      return NextResponse.json({
        success: false,
        message: "Tittle, Description and content required",
      });
    }

    const newBlog = {
      title,
      description,
      content,
      author: decoded.userId,
    };

    const blog = await Blog.create(newBlog);
    return NextResponse.json({
      success: true,
      message: "blog created successfull",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
