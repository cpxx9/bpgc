"use server";
import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { formatError } from "@/lib/utils";
import { createScoreSchema } from "@/lib/validators";
import { UpdateScore } from "@/types";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function createScore(prevState: unknown, formData: FormData) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const score = createScoreSchema.parse({
      eventId: formData.get("eventId"),
      golferId: formData.get("golferId"),
      score: formData.get("score"),
      birdies: formData.get("birdies"),
      snowmen: formData.get("snowmen"),
      closestToPin: formData.get("closestToPin"),
    });

    await prisma.score.create({
      data: {
        eventId: score.eventId,
        golferId: score.golferId,
        score: score.score,
        birdies: score.birdies,
        snowmen: score.snowmen,
        closestToPin: score.closestToPin,
      },
    });

    revalidatePath(`/admin/events/${score.eventId}`);
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    return { success: false, message: formatError(err) };
  }
}

export async function getScoreById(scoreId: string | undefined) {
  if (!scoreId) throw new Error("No id passed");
  const score = await prisma.score.findFirst({
    where: { id: scoreId },
  });
  if (!score) throw new Error("Score not found");
  return score;
}

export async function getEventScoreWinners(eventId: string) {
  try {
    const lowestScore = await prisma.score.findFirst({
      where: {
        eventId: eventId,
      },
      include: {
        golfer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        score: "desc",
      },
    });

    return {
      success: true,
      data: {
        lowestScore,
      },
    };
  } catch (err) {}
}

export async function updateScore(score: UpdateScore) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    await prisma.score.update({
      where: { id: score.id },
      data: {
        score: score.score,
        birdies: score.birdies,
        snowmen: score.snowmen,
        closestToPin: score.closestToPin,
      },
    });

    revalidatePath(`/admin/events/${score.eventId}`);

    return {
      success: true,
      message: "Score updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}
