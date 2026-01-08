"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { PAGE_SIZE } from "@/lib/constants";
import { formatError } from "@/lib/utils";
import { createGolferSchema } from "@/lib/validators";
import { Golfer, UpdateGolfer } from "@/types";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function createGolfer(prevState: unknown, formData: FormData) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const golfer = createGolferSchema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      hci: Number(formData.get("hci")),
      // twoManTeam: formData.get("twoManTeam"),
    });

    await prisma.golfer.create({
      data: {
        firstName: golfer.firstName,
        lastName: golfer.lastName,
        hci: golfer.hci,
        // twoManTeamId: golfer.twoManTeam ? golfer.twoManTeam : null,
      },
    });

    revalidatePath("/admin/users");

    return { success: true, message: "User registered successfully." };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    return { success: false, message: formatError(err) };
  }
}

export async function getGolferCount() {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const golferCount = await prisma.golfer.count();

    return { success: true, golferCount };
  } catch (err) {
    return { success: false, message: formatError(err) };
  }
}

export async function getGolferById(golferId: string | undefined) {
  if (!golferId) throw new Error("No id passed");
  const golfer = await prisma.golfer.findFirst({
    where: { id: golferId },
  });
  if (!golfer) throw new Error("Golfer not found");
  return golfer;
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
    const data: Golfer[] = await prisma.golfer.findMany({
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
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function updateGolfer(golfer: UpdateGolfer) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    await prisma.golfer.update({
      where: { id: golfer.id },
      data: {
        firstName: golfer.firstName,
        lastName: golfer.lastName,
        hci: golfer.hci,
      },
    });

    revalidatePath("/admin/golfers");

    return {
      success: true,
      message: "Golfer updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function deleteGolfer(id: string) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    await prisma.golfer.delete({ where: { id } });
    revalidatePath("/admin/golfers");
    return {
      success: true,
      message: "Golfer deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}
