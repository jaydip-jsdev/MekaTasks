"use server"

import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export const isAuthenticated = async () => {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) return false;

    verifyToken(token);

    return true;
  } catch {
    return false;
  }
};
