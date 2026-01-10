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
    let timeString = String(formData.get("time"));
    timeString = String(`2000-01-01T${timeString}:00-05:00`);
    const isTwoManMatch = formData.get("isTwoManMatch");

    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const event = createEventSchema.parse({
      date: new Date(String(formData.get("date"))),
      time: new Date(timeString),
      location: formData.get("location"),
      description: formData.get("description"),
      leagueWeek: Number(formData.get("leagueWeek")),
      isTwoManMatch: isTwoManMatch ? true : false,
    });

    console.log(event);

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

export async function getEventCount() {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const eventCount = await prisma.event.count();

    return { success: true, eventCount };
  } catch (err) {
    return { success: false, message: formatError(err) };
  }
}

export async function getEventById(eventId: string | undefined) {
  if (!eventId) throw new Error("No id passed");
  const event = await prisma.event.findFirst({
    where: { id: eventId },
  });
  if (!event) throw new Error("Event not found");
  return event;
}

export async function getAllEvents({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const data: Event[] = await prisma.event.findMany({
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

export async function updateEvent(event: UpdateEvent) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    await prisma.event.update({
      where: { id: event.id },
      data: {
        date: new Date(event.date),
        time: new Date(event.time),
        location: event.location,
        description: event.description,
        leagueWeek: event.leagueWeek,
        // isTwoManMatch: event.isTwoManMatch,
      },
    });

    revalidatePath("/admin/events");

    return {
      success: true,
      message: "Event updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function deleteEvent(id: string) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    await prisma.event.delete({ where: { id } });
    revalidatePath("/admin/events");
    return {
      success: true,
      message: "Event deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}
