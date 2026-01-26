import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value ?? "";

  if (path.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  try {
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      throw new Error("Invalid token");
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/dashboard"],
};
