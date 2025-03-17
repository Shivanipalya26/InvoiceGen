import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
  
export function signJwt(payload: object) {
  return jwt.sign(payload, SECRET_KEY);
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
