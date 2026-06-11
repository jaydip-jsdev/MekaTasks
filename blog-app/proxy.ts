import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    const isPublicPaths = path === "/login" || path === "/register";

    if (!token && !isPublicPaths) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && isPublicPaths) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({
      message: "something went wrong",
    });
  }
}

export const config = {
  matcher: [
    "/login",
    "/profile",
    "/register",
    // "/api/blog/create",
    "/api/blog/edit/:path*",
    "/api/blog/delete",
  ],
};
