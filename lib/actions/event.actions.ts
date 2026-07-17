"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { PAGE_SIZE } from "@/lib/constants";
import { computeTotal, formatError, isPhantomGolfer } from "@/lib/utils";
import { createEventSchema } from "@/lib/validators";
import {
  ActionResult,
  Event,
  EventWithScores,
  TwoManTeamStandingsPublic,
  UpdateEvent,
  WeeklyMatchupsPublic,
} from "@/types";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function createEvent(prevState: unknown, formData: FormData) {
  try {
    let timeString = String(formData.get("time"));
    timeString = String(`2000-01-01T${timeString}:00-05:00`);
    const isTwoManMatch = formData.get("isTwoManMatch");
    const isChampionship = formData.get("isChampionship");

    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const event = createEventSchema.parse({
      date: new Date(String(formData.get("date"))),
      time: new Date(timeString),
      location: formData.get("location"),
      description: formData.get("description"),
      leagueWeek: Number(formData.get("leagueWeek")),
      isTwoManMatch: isTwoManMatch ? true : false,
      isChampionship: isChampionship ? true : false,
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

export async function getEventById(
  eventId: string | undefined,
): Promise<ActionResult<Event>> {
  try {
    if (!eventId) throw new Error("No id passed");
    const event = await prisma.event.findFirst({
      where: { id: eventId },
    });

    if (!event) throw new Error("Event not found");

    return { success: true, data: event };
  } catch (err) {
    return { success: false, message: formatError(err) };
  }
}

export async function getNextEvent() {
  try {
    const nextEvent = await prisma.event.findFirst({
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    if (!nextEvent) throw new Error("Event not found");

    return {
      success: true,
      data: nextEvent as Event,
    };
  } catch (err) {
    return { success: false, message: formatError(err) };
  }
}

export async function getPreviousEvent(): Promise<
  ActionResult<EventWithScores>
> {
  try {
    const previousEvent = await prisma.event.findFirstOrThrow({
      where: {
        date: {
          lte: new Date(),
        },
      },
      include: {
        scores: {
          orderBy: {
            score: "asc",
          },
          include: {
            golfer: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return {
      success: true,
      data: previousEvent,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
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
      orderBy: { leagueWeek: "asc" },
      take: limit,
      skip: (page - 1) * limit,
    });

    const dataCount = await prisma.event.count();

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

export async function getEventSchedule() {
  const currentYearOnly = new Date().getFullYear();
  const currentYear = new Date(currentYearOnly, 0, 1);
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);

  try {
    const schedule = await prisma.$transaction(async (tx) => {
      const april: Event[] = await prisma.$queryRaw`
        SELECT * FROM "Event"
        WHERE EXTRACT(MONTH FROM "date") = 4
        ORDER BY "date" ASC
      `;

      const may: Event[] = await prisma.$queryRaw`
        SELECT * FROM "Event"
        WHERE EXTRACT(MONTH FROM "date") = 5
        ORDER BY "date" ASC
      `;

      const june: Event[] = await prisma.$queryRaw`
        SELECT * FROM "Event"
        WHERE EXTRACT(MONTH FROM "date") = 6
        ORDER BY "date" ASC
      `;

      const july: Event[] = await prisma.$queryRaw`
        SELECT * FROM "Event"
        WHERE EXTRACT(MONTH FROM "date") = 7
        ORDER BY "date" ASC
      `;

      const august: Event[] = await prisma.$queryRaw`
        SELECT * FROM "Event"
        WHERE EXTRACT(MONTH FROM "date") = 8
        ORDER BY "date" ASC
      `;

      const september: Event[] = await prisma.$queryRaw`
        SELECT * FROM "Event"
        WHERE EXTRACT(MONTH FROM "date") = 9
        ORDER BY "date" ASC
      `;

      const october: Event[] = await prisma.$queryRaw`
        SELECT * FROM "Event"
        WHERE EXTRACT(MONTH FROM "date") = 10
        ORDER BY "date" ASC
      `;

      return {
        april,
        may,
        june,
        july,
        august,
        september,
        october,
      };
    });

    return {
      success: true,
      data: schedule,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function getWeeklyMatchesPublic(
  year?: number,
): Promise<ActionResult<WeeklyMatchupsPublic[]>> {
  try {
    const targetYear = year ?? new Date().getFullYear();
    const start = new Date(Date.UTC(targetYear, 0, 1));
    const end = new Date(Date.UTC(targetYear + 1, 0, 1));

    const events = await prisma.event.findMany({
      where: {
        isTwoManMatch: true,
        isChampionship: false,
        date: { gte: start, lt: end },
      },
      orderBy: { leagueWeek: "asc" },
      select: {
        id: true,
        date: true,
        leagueWeek: true,
        match: {
          select: {
            id: true,
            teams: {
              select: {
                twoManTeam: {
                  select: { number: true },
                },
              },
            },
          },
        },
      },
    });

    const data = events.map((event, index) => ({
      week: index + 1,
      completed: event.date < new Date(),
      matchups: event.match
        .map((m) => {
          const nums = m.teams
            .map((t) => t.twoManTeam.number)
            .sort((a, b) => a - b);
          return {
            id: m.id,
            teamOne: nums[0],
            teamTwo: nums[1],
          };
        })
        .sort((a, b) => a.teamOne - b.teamOne),
    }));

    return { success: true, data, year: targetYear };
  } catch (err) {
    return { success: false, message: formatError(err) };
  }
}

export async function getTwoManTeamsStandingsPublic(): Promise<
  ActionResult<TwoManTeamStandingsPublic[]>
> {
  try {
    const targetYear = new Date().getFullYear();
    const start = new Date(Date.UTC(targetYear, 0, 1));
    const end = new Date(Date.UTC(targetYear + 1, 0, 1));
    const now = new Date();

    const events = await prisma.event.findMany({
      where: {
        isTwoManMatch: true,
        isChampionship: false,
        date: { gte: start, lt: end },
      },
      orderBy: { leagueWeek: "asc" },
      select: {
        id: true,
        date: true,
        match: {
          select: {
            teams: { select: { twoManTeamId: true, score: true } },
          },
        },
      },
    });

    const playedWeeks = new Set<number>();
    events.forEach((event, i) => {
      const anyScored = event.match.some((m) =>
        m.teams.some((t) => t.score > 0),
      );
      if (anyScored) playedWeeks.add(i + 1);
    });

    const scoreLookup = new Map<string, number>();
    for (const e of events) {
      for (const match of e.match) {
        for (const t of match.teams) {
          const key = `${e.id}::${t.twoManTeamId}`;
          scoreLookup.set(key, (scoreLookup.get(key) ?? 0) + t.score);
        }
      }
    }

    const teams = await prisma.twoManTeam.findMany({
      where: { active: true },
      select: {
        id: true,
        number: true,
        memberships: {
          where: { endDate: null },
          select: { golfer: { select: { firstName: true, lastName: true } } },
        },
      },
    });

    const data: TwoManTeamStandingsPublic[] = teams
      .filter(
        (team) => !team.memberships.some((m) => isPhantomGolfer(m.golfer)),
      )
      .map((team) => {
        const weeklyScores = events.map((e, i) => {
          const week = i + 1;
          const raw = scoreLookup.get(`${e.id}::${team.id}`) ?? 0;

          if (raw > 0) return { week, score: raw };
          if (e.date < now) return { week, score: "DNP" as const };
          return { week, score: null };
        });

        const total = computeTotal(weeklyScores, playedWeeks);

        return {
          id: team.id,
          number: team.number,
          golfers: team.memberships.map((m) => m.golfer),
          weeklyScores,
          total,
        };
      });

    data.sort((a, b) => b.total - a.total);

    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function updateEvent(event: UpdateEvent) {
  let timeString = String(event.time);
  timeString = String(`2000-01-01T${timeString}-05:00`);
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    await prisma.event.update({
      where: { id: event.id },
      data: {
        date: new Date(event.date),
        time: new Date(timeString),
        location: event.location,
        description: event.description,
        leagueWeek: event.leagueWeek,
        isTwoManMatch: event.isTwoManMatch,
        isChampionship: event.isChampionship,
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
