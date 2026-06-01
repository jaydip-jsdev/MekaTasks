import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET!;

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const GenerateToken = (
  id: string,
  email: string,
  role: string,
): string => {
  return jwt.sign({ id, email, role }, secretKey, { expiresIn: "1h" });
};

export const VerifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, secretKey) as JwtPayload;
};
