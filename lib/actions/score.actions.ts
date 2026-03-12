"use server";
import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { formatError } from "@/lib/utils";
import { UpdateScore } from "@/types";
import { revalidatePath } from "next/cache";

export async function getEventById(eventId: string | undefined) {
  if (!eventId) throw new Error("No id passed");
  const event = await prisma.event.findFirst({
    where: { id: eventId },
  });
  if (!event) throw new Error("Event not found");
  return event;
}

export async function updateScore(score: UpdateScore) {
  console.log(score);
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
