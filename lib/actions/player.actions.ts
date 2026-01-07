"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { formatError } from "@/lib/utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function createPlayer(formData: FormData) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatError(error) };
  }
}

export async function getPlayerCount() {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const playerCount = await prisma.player.count();

    return { success: true, playerCount };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
