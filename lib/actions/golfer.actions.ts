"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { PAGE_SIZE } from "@/lib/constants";
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

export async function getGolferCount() {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const golferCount = await prisma.golfer.count();

    return { success: true, golferCount };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function getAllGolfers({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const data = await prisma.golfer.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    });

    const dataCount = await prisma.user.count();

    return {
      success: true,
      data,
      totalPages: Math.ceil(dataCount / limit),
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
