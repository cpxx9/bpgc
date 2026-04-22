"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { PAGE_SIZE } from "@/lib/constants";
import { formatError } from "@/lib/utils";
import { UpdateMatchup } from "@/types";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function updateMatchups(matchups: UpdateMatchup) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    await prisma.$transaction(async (tx) => {
      await tx.matchups.update({
        where: {
          id: matchups.matchupOneId,
        },
        data: {
          score: matchups.matchupOneScore,
        },
      });

      await tx.matchups.update({
        where: {
          id: matchups.matchupTwoId,
        },
        data: {
          score: matchups.matchupTwoScore,
        },
      });
    });

    revalidatePath(`/admin/events/${matchups.eventId}`);

    return {
      success: true,
      message: "Matchups updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}
