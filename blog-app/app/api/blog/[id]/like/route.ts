import { verifyToken } from "@/lib/jwt";
import { ConnectDb } from "@/lib/monogoose";
import { LikesModal } from "@/models/likes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
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

    const user = verifyToken(token);

    if (!user)
      return NextResponse.json(
        { success: false, message: "aunaothorized" },
        { status: 401 },
      );

    const { id: blogId } = await context.params;

    const existingLikes = await LikesModal.findOne({
      user: user.userId,
      blog: blogId,
    });

    if (existingLikes) {
        await 
    }
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
