import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";

const getCurrentAdmin = cache(async () => {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) return null;

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, role: true },
  });

  return user?.role === "admin" ? session : null;
});

export async function requireAdmin() {
  const session = await getCurrentAdmin();
  if (!session) redirect("/unauthorized");
  return session;
}

export async function requireAdminAction() {
  return (await getCurrentAdmin()) !== null;
}