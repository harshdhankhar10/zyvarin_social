import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";

export async function currentLoggedInUserInfo() {
  const session = await getServerSession(NEXT_AUTH);
  if (!session) return false;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email || "" },
  });

  if (!user) return false;

  return user;
}

export async function isLoggedIn() {
  const session = await getServerSession(NEXT_AUTH);
  return !!session;
}