import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password, firstName, lastName } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 },
      );
    }

    const hashedPassowrd = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: username.trim().toLowerCase(),
        password: hashedPassowrd,
        firstName,
        lastName,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      userId: user.id,
    });
  } catch (e) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
