import jwt from "jsonwebtoken"

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in env");
}
const JWT_SECRET = process.env.JWT_SECRET;

export function signToken(payload: {userId: number}) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
}