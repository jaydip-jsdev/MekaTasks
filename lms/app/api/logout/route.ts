import { ApiError } from "@/lib/api-response";
import ConnectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "logout successfull",
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);
    return ApiError("server errror");
  }
}
