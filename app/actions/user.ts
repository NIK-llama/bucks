"use server";

import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function updateProfile(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  const decodedToken = await verifyToken(token);
  const userId = decodedToken.userId;

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { firstName, lastName },
  });
}
