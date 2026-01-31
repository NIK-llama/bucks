import prisma from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const amount = Math.round(Number(body.amount));
    const toUserId = Number(body.to);

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Invalid transfer amount" },
        { status: 400 },
      );
    }

    const decoded = await verifyToken(token);
    const fromUserId = Number(decoded.userId);

    if (fromUserId === toUserId) {
      return NextResponse.json(
        { error: "Cannot send money to yourself" },
        { status: 400 },
      );
    }

    await prisma.$transaction(async (tx) => {
      const senderUpdate = await tx.account.updateMany({
        where: {
          userId: fromUserId,
          balance: { gte: amount },
        },
        data: {
          balance: { decrement: amount },
        },
      });

      if (senderUpdate.count === 0) {
        throw new Error("Insufficient balance or account not found");
      }

      try {
        await tx.account.update({
          where: { userId: toUserId },
          data: { balance: { increment: amount } },
        });
      } catch (e) {
        throw new Error("INVALID_RECEIVER");
      }
    });

    return NextResponse.json({ message: "Transfer successful" });
  } catch (error: any) {
    console.error(error.message);

    if (
      error.message === "Insufficient balance" ||
      error.message === "Invalid receiver account"
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Transfer failed" }, { status: 500 });
  }
}
