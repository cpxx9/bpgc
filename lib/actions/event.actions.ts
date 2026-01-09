"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { PAGE_SIZE } from "@/lib/constants";
import { formatError } from "@/lib/utils";
import { createEventSchema } from "@/lib/validators";
import { Event, UpdateEvent } from "@/types";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function createEvent(prevState: unknown, formData: FormData) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const event = createEventSchema.parse({
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
      description: formData.get("description"),
      leagueWeek: formData.get("leagueWeek"),
      isTwoManMatch: formData.get("isTwoManMatch"),
    });

    await prisma.event.create({
      data: event,
    });

    revalidatePath("/admin/events");

    return { success: true, message: "Event created successfully." };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    return { success: false, message: formatError(err) };
  }
}
