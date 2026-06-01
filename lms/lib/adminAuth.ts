import { NextRequest } from "next/server";
import { VerifyToken } from "./jwt";

export const AdminAuth = (req: NextRequest) => {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
        status: 401,
      };
    }

    const decoded = VerifyToken(token) as {
      id: string;
      email: string;
      role: string;
    };

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
    };
  } catch {
    return {
      success: false,
      message: "Invalid Token",
      status: 401,
    };
  }
};
