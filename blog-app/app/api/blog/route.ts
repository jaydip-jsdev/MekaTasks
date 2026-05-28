import { ConnectDb } from "@/lib/monogoose";
import blog from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await ConnectDb();
    const blogs = await blog.find({});
    console.log("bloggggg", blogs);

    if (blogs.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No blogs found",
        data: blogs,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blogs fetched successfull",
        data: blogs,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
