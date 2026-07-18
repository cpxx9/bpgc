"use server";
import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { formatError } from "@/lib/utils";
import { createScoreSchema } from "@/lib/validators";
import {
  ActionResult,
  ContestWinnersPublic,
  EventWithScoreAverage,
  UpdateScore,
} from "@/types";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { eventNames } from "process";

const _currentYear = new Date().getFullYear();

const startOfYear = new Date(new Date().getFullYear(), 0, 1);
const endOfYear = new Date(new Date().getFullYear(), 11, 31);

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

export async function getScoreAveragesForEvents(): Promise<
  ActionResult<EventWithScoreAverage[]>
> {
  try {
    const data = await prisma.$queryRaw<EventWithScoreAverage[]>`
      SELECT
        e.id,
        e.location,
        e.date,
        e."leagueWeek",
        AVG(s.score)::float AS "avgScore"
      FROM "Event" e
      LEFT JOIN "Score" s
        ON s."eventId" = e.id
      WHERE e."date" >= date_trunc('year', CURRENT_DATE)
        AND e."date" < date_trunc('year', CURRENT_DATE) + INTERVAL '1 year'
      GROUP BY e.id, e.location, e."leagueWeek"
      ORDER BY e."date";
    `;

    if (!data) throw new Error("No Event averages found!");
    data.forEach((event) => {
      if (event.avgScore === null && event.date < new Date()) {
        event.avgScore = "dnp";
      }
    });

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

/* TO-DO
Checks for Null
return readable text if there is no contest winner yet
*/
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
        score: "asc",
      },
    });

    const closestToPin = await prisma.score.findFirst({
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
        closestToPin: "asc",
      },
    });

    const mostBirdies = await prisma.score.findFirst({
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
        birdies: "desc",
      },
    });

    const mostSnowmen = await prisma.score.findFirst({
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
        snowmen: "desc",
      },
    });

    return {
      success: true,
      data: {
        lowestScore: {
          name: lowestScore?.score
            ? `${lowestScore?.golfer.firstName} ${lowestScore?.golfer.lastName}`
            : "No winner",
          score: lowestScore?.score ? lowestScore.score : "",
        },
        closestToPin: {
          name: closestToPin?.closestToPin
            ? `${closestToPin?.golfer.firstName} ${closestToPin?.golfer.lastName}`
            : "No winner",
          score: closestToPin?.closestToPin ? closestToPin?.closestToPin : "",
        },
        mostBirdies: {
          name: mostBirdies?.birdies
            ? `${mostBirdies?.golfer.firstName} ${mostBirdies?.golfer.lastName}`
            : "No winner",
          score: mostBirdies?.birdies ? mostBirdies.birdies : "",
        },
        mostSnowmen: {
          name: mostSnowmen?.snowmen
            ? `${mostSnowmen?.golfer.firstName} ${mostSnowmen?.golfer.lastName}`
            : "No winner",
          score: mostSnowmen?.snowmen ? mostSnowmen.snowmen : "",
        },
      },
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function getContestWinnersPublic(): Promise<
  ActionResult<ContestWinnersPublic>
> {
  const targetYear = new Date().getFullYear();
  const start = new Date(Date.UTC(targetYear, 0, 1));
  const end = new Date(Date.UTC(targetYear + 1, 0, 1));
  const now = new Date();

  try {
    const birdies = prisma.score.aggregate({
      _avg: { birdies: true },
      where: { event: { date: { gte: start, lt: end } } },
    });

    console.log(birdies);

    const data = {} as ContestWinnersPublic;
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
