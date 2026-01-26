import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "";

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: filter,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: filter,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      firstName: true,
      lastName: true,
      id: true,
    },
  });

  return NextResponse.json({
    users: users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user.id,
    })),
  });
}
