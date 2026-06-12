"use server";

import { cookies } from "next/headers";
import { VerifyToken } from "../jwt/jwt";

const isAuthenticated = async () => {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) return false;

    VerifyToken(token);
    return true;
  } catch (error) {
    return false;
  }
};

export default isAuthenticated;
