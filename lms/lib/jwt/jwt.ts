import { TokenPayload } from "@/Types/TokenPayload";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET!;

export const GenerateToken = (
  id: string,
  email: string,
  role: string,
): string => {
  return jwt.sign({ id, email, role }, secretKey, { expiresIn: "1h" });
};

export const VerifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, secretKey) as TokenPayload;
};
