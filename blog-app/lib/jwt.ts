import { TokenPayload } from "@/Types/token";
import jwt from "jsonwebtoken";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.jwt_secret!, {
    expiresIn: "7d",
  });
};

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, process.env.jwt_secret!) as TokenPayload;
}
