import { NextRequest } from "next/server";
import { VerifyToken } from "./jwt";
import { TokenPayload } from "@/Types/TokenPayload";

export const AdminAuth = (req: NextRequest) => {
  try {
    const authHeader = req.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : undefined;
    const token = bearerToken || req.cookies.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
        status: 401,
      };
    }

    const decoded = VerifyToken(token) as TokenPayload;

    if (decoded.role !== "admin") {
      return {
        success: false,
        message: "Admin Access Required",
        status: 403,
      };
    }

    return {
      success: true,
      user: decoded,
      status: 200,
    };
  } catch {
    return {
      success: false,
      message: "Invalid Token",
      status: 401,
    };
  }
};
