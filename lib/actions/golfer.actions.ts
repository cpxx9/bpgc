"use server";

import { prisma } from "@/db/prisma";
import { getAllEvents } from "@/lib/actions/event.actions";
import { deleteTwoManTeam } from "@/lib/actions/two-man-team.actions";
import { requireAdminAction } from "@/lib/auth-guard";
import { PAGE_SIZE } from "@/lib/constants";
import { formatError } from "@/lib/utils";
import { createGolferSchema } from "@/lib/validators";
import {
  ActionResult,
  Golfer,
  GolferWithScoreAverage,
  GolferWithTeammate,
  UpdateGolfer,
} from "@/types";
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
    });

    await prisma.golfer.create({
      data: {
        firstName: golfer.firstName,
        lastName: golfer.lastName,
        hci: golfer.hci,
      },
    });

    revalidatePath("/admin/users");

    return { success: true, message: "Golfer registered successfully." };
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

export async function getAllGolfersList() {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const data: Golfer[] = await prisma.golfer.findMany({
      // new changes, change where statement
      // where: {
      //   OR: [
      //     { twoManTeamId: null, active: true },
      //     { twoManTeam: { active: false }, active: true },
      //   ],
      // },
      where: {
        active: true,
        memberships: { none: { endDate: null } },
      },
      orderBy: { lastName: "asc" },
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

export async function getAllGolfersWithScoreAverages(): Promise<
  ActionResult<GolferWithScoreAverage[]>
> {
  try {
    const avgs = await prisma.score.groupBy({
      by: ["golferId"],
      _avg: { score: true },
    });

    const golfers = await prisma.golfer.findMany({
      where: { id: { in: avgs.map((a) => a.golferId) } },
      select: { id: true, firstName: true, lastName: true },
    });

    const avgById = new Map(avgs.map((a) => [a.golferId, a._avg.score]));

    const data = golfers

      .map((g) => ({
        id: g.id,
        firstName: g.firstName,
        lastName: g.lastName,
        avgScore: avgById.get(g.id)!,
      }))
      .sort((a, b) => {
        const diff = a.avgScore - b.avgScore;
        if (diff !== 0) return diff;

        return (
          a.lastName.localeCompare(b.lastName) ||
          a.firstName.localeCompare(b.firstName)
        );
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

export async function getAllGolfersWithEventScoreList(eventId: string) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const data = await prisma.golfer.findMany({
      orderBy: [
        {
          lastName: "asc",
        },
        {
          firstName: "asc",
        },
      ],
      include: {
        scores: {
          where: {
            eventId: eventId,
          },
        },
      },
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
    // new changes, getAllGolfers with new memberships relation
    // const data: Golfer[] = await prisma.golfer.findMany({
    //   orderBy: [{ active: "desc" }, { lastName: "asc" }, { firstName: "asc" }],
    //   take: limit,
    //   skip: (page - 1) * limit,
    //   include: {
    //     twoManTeam: {
    //       include: {
    //         golfers: true,
    //       },
    //     },
    //   },
    // });

    // const dataCount = await prisma.golfer.count();

    // return {
    //   success: true,
    //   data: data as GolferWithTeammate[],
    //   totalPages: Math.ceil(dataCount / limit),
    // };
    const raw = await prisma.golfer.findMany({
      orderBy: [{ active: "desc" }, { lastName: "asc" }, { firstName: "asc" }],
      take: limit,
      skip: (page - 1) * limit,
      include: {
        memberships: {
          where: { endDate: null },
          include: {
            twoManTeam: {
              include: {
                memberships: {
                  include: { golfer: true },
                },
              },
            },
          },
        },
      },
    });

    const data = raw.map((golfer) => {
      const team = golfer.memberships[0]?.twoManTeam ?? null;
      return {
        ...golfer,
        twoManTeam: team
          ? { ...team, golfers: team.memberships.map((m) => m.golfer) }
          : null,
      };
    });

    const dataCount = await prisma.golfer.count();

    return {
      success: true,
      data: data as unknown as GolferWithTeammate[],
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
        active: golfer.active,
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

/*
Delete two man team when golfer is deleted
*/
export async function deleteGolfer(id: string) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    // new changes, different delete logic
    // await prisma.$transaction(async (tx) => {
    //   const twoManTeamToDelete = await tx.twoManTeam.findFirst({
    //     where: {
    //       golfers: {
    //         some: {
    //           id: id,
    //         },
    //       },
    //     },
    //   });
    //   twoManTeamToDelete?.id && (await deleteTwoManTeam(twoManTeamToDelete.id));
    //   await tx.golfer.delete({ where: { id } });
    // });

    await prisma.$transaction(async (tx) => {
      const currentMembership = await tx.teamMembership.findFirst({
        where: { golferId: id, endDate: null },
      });
      currentMembership?.twoManTeamId &&
        (await deleteTwoManTeam(currentMembership.twoManTeamId));
      await tx.golfer.delete({ where: { id } });
    });

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
