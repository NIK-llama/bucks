import prisma from "@/lib/db";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcrypt";
import { NextResponse,NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "invalid credentials" },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }
    
    const token = signToken({ userId: user.id })
    
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    })

    return response;
  } catch (e) {
    NextResponse.json(
        { error: "Signin failed" }, 
        { status: 500 }
    );
  }
}
