"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { PAGE_SIZE } from "@/lib/constants";
import { formatError } from "@/lib/utils";
import { createTwoManTeamSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function createTwoManTeam(prevState: unknown, formData: FormData) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    const golfers = createTwoManTeamSchema.parse({
      golferOneID: formData.get("golferOneID"),
      golferTwoID: formData.get("golferTwoID"),
    });

    await prisma.$transaction(async (tx) => {
      const newTwoManTeam = await tx.twoManTeam.create({ data: {} });
      await tx.golfer.update({
        where: {
          id: golfers.golferOneID,
        },
        data: {
          twoManTeamId: newTwoManTeam.id,
        },
      });

      await tx.golfer.update({
        where: {
          id: golfers.golferTwoID,
        },
        data: {
          twoManTeamId: newTwoManTeam.id,
        },
      });
    });

    revalidatePath("/admin/two-man-teams");

    return { success: true, message: "Two man team created successfully." };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    return { success: false, message: formatError(err) };
  }
}

export async function getTwoManTeamCount() {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const twoManTeamCount = await prisma.twoManTeam.count();

    return { success: true, twoManTeamCount };
  } catch (err) {
    return { success: false, message: formatError(err) };
  }
}

export async function getTwoManTeamById(twoManTeamId: string | undefined) {
  if (!twoManTeamId) throw new Error("No id passed");
  const twoManTeam = await prisma.twoManTeam.findFirst({
    where: { id: twoManTeamId },
  });
  if (!twoManTeam) throw new Error("Two Man Team not found");
  return twoManTeam;
}

export async function getAllTwoManTeams({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const data = await prisma.twoManTeam.findMany({
      include: {
        golfers: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    });

    const dataCount = await prisma.twoManTeam.count();

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

export async function deleteTwoManTeam(id: string) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    await prisma.twoManTeam.delete({ where: { id } });
    revalidatePath("/admin/two-man-teams");
    return {
      success: true,
      message: "Two Man Team deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}
