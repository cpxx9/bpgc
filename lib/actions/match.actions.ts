"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { PAGE_SIZE } from "@/lib/constants";
import { formatError } from "@/lib/utils";
import { Match } from "@/types";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function createMatch(matchInfo: Match) {
  const admin = await requireAdminAction();
  try {
    if (!admin) throw new Error("You are not authorized!");
    if (matchInfo.twoManTeamOneID === matchInfo.twoManTeamOneID)
      throw new Error("Opponents cannot be the same team!");

    await prisma.$transaction(async (tx) => {
      const newMatch = await tx.match.create({
        data: { eventId: matchInfo.eventID },
      });

      await tx.matchups.create({
        data: {
          twoManTeamId: matchInfo.twoManTeamOneID,
          matchId: newMatch.id,
        },
      });

      await tx.matchups.create({
        data: {
          twoManTeamId: matchInfo.twoManTeamTwoID,
          matchId: newMatch.id,
        },
      });
    });

    revalidatePath(`/admin/events/${matchInfo.eventID}`);

    return { success: true, message: "Matchup created successfully." };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    return { success: false, message: formatError(err) };
  }
}
