"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { PAGE_SIZE } from "@/lib/constants";
import { formatError } from "@/lib/utils";
import { createTwoManTeamSchema } from "@/lib/validators";
import {
  ActionResult,
  TwoManTeam,
  TwoManTeamPublic,
  UpdateTwoManTeam,
} from "@/types";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function createTwoManTeam(golfers: TwoManTeam) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    if (golfers.golferOneID === golfers.golferTwoID)
      throw new Error("Teammates cannot be the same golfer!");

    // new changes, update transaction to work with new memberships
    // await prisma.$transaction(async (tx) => {
    //   const newTwoManTeam = await tx.twoManTeam.create({ data: {} });
    //   await tx.golfer.update({
    //     where: {
    //       id: golfers.golferOneID,
    //     },
    //     data: {
    //       twoManTeamId: newTwoManTeam.id,
    //     },
    //   });

    //   await tx.golfer.update({
    //     where: {
    //       id: golfers.golferTwoID,
    //     },
    //     data: {
    //       twoManTeamId: newTwoManTeam.id,
    //     },
    //   });
    // });

    await prisma.$transaction(async (tx) => {
      const newTwoManTeam = await tx.twoManTeam.create({ data: {} });

      await tx.teamMembership.updateMany({
        where: {
          golferId: { in: [golfers.golferOneID, golfers.golferTwoID] },
          endDate: null,
        },
        data: { endDate: new Date() },
      });

      await tx.teamMembership.createMany({
        data: [
          { golferId: golfers.golferOneID, twoManTeamId: newTwoManTeam.id },
          { golferId: golfers.golferTwoID, twoManTeamId: newTwoManTeam.id },
        ],
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

    // new changes, get all teams with new memberships model
    // const data = await prisma.twoManTeam.findMany({
    //   include: {
    //     golfers: true,
    //   },
    //   orderBy: { number: "asc" },
    //   take: limit,
    //   skip: (page - 1) * limit,
    // });

    const raw = await prisma.twoManTeam.findMany({
      include: {
        memberships: {
          include: { golfer: true },
        },
      },
      orderBy: { number: "asc" },
      take: limit,
      skip: (page - 1) * limit,
    });

    const data = raw.map((t) => ({
      ...t,
      golfers: t.memberships.map((m) => m.golfer),
    }));

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

export async function getAllTwoManTeamsList(eventId: string) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    // new changes, get all teams list with new memberships model
    // const data = await prisma.twoManTeam.findMany({
    //   where: {
    //     active: true,
    //     scores: {
    //       none: {
    //         match: {
    //           eventId,
    //         },
    //       },
    //     },
    //   },
    //   orderBy: { number: "asc" },
    //   include: { golfers: true },
    // });

    const raw = await prisma.twoManTeam.findMany({
      where: {
        active: true,
        scores: { none: { match: { eventId } } },
      },
      orderBy: { number: "asc" },
      include: {
        memberships: {
          include: { golfer: true },
        },
      },
    });

    const data = raw.map((t) => ({
      ...t,
      golfers: t.memberships.map((m) => m.golfer),
    }));

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

export async function getTwoManTeamsPublic(): Promise<
  ActionResult<TwoManTeamPublic[]>
> {
  try {
    const teams = await prisma.twoManTeam.findMany({
      select: {
        number: true,
        memberships: {
          select: {
            golfer: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: { number: "asc" },
    });

    const parsed = teams.map((t) => ({
      number: t.number,
      golfers: t.memberships.map((m) => m.golfer),
    }));

    return {
      success: true,
      data: parsed,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function updateTwoManTeam(data: UpdateTwoManTeam) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    await prisma.twoManTeam.update({
      where: {
        id: data.teamId,
      },
      data: {
        number: data.number,
      },
    });

    revalidatePath("/admin/two-man-teams");

    return {
      success: true,
      message: "TwoManTeam number updated successfully",
    };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function reinstateTwoManTeam(id: string) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    return await prisma.$transaction(async (tx) => {
      // 1. Load the team and its memberships
      const team = await tx.twoManTeam.findUnique({
        where: { id },
        include: {
          memberships: {
            include: { golfer: true },
          },
        },
      });

      if (!team) throw new Error("Team not found.");
      if (team.active) throw new Error("Team is already active.");
      if (team.memberships.length === 0)
        throw new Error("Team has no roster to reinstate.");
      if (team.memberships.length < 2)
        throw new Error(
          "Cannot reinstate team: original roster is incomplete.",
        );

      const golferIds = team.memberships.map((m) => m.golferId);

      // 2. Check that none of these golfers currently belong to another active team
      const conflicts = await tx.teamMembership.findMany({
        where: {
          golferId: { in: golferIds },
          endDate: null,
          twoManTeamId: { not: id },
          twoManTeam: { active: true },
        },
        include: {
          golfer: { select: { firstName: true, lastName: true } },
          twoManTeam: { select: { number: true } },
        },
      });

      if (conflicts.length > 0) {
        const details = conflicts
          .map(
            (c) =>
              `${c.golfer.firstName} ${c.golfer.lastName} is on active team #${c.twoManTeam.number}`,
          )
          .join("; ");
        throw new Error(`Cannot reinstate team: ${details}.`);
      }

      // 3. Reopen this team's memberships
      await tx.teamMembership.updateMany({
        where: { twoManTeamId: id },
        data: { endDate: null },
      });

      // 4. Mark the team active
      await tx.twoManTeam.update({
        where: { id },
        data: { active: true, number: 1 },
      });

      revalidatePath("/admin/two-man-teams");
      revalidatePath("/admin/golfers");
      return {
        success: true,
        message: "Two man team reinstated successfully!",
      };
    });
  } catch (err) {
    return { success: false, message: formatError(err) };
  }
}

export async function disbandTwoManTeam(id: string) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    // new changes, fix disband logic with new membership model
    // await prisma.twoManTeam.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {
    //     active: false,
    //     number: 999,
    //   },
    // });

    await prisma.$transaction(async (tx) => {
      await tx.twoManTeam.update({
        where: { id },
        data: { active: false, number: 999 },
      });
      await tx.teamMembership.updateMany({
        where: { twoManTeamId: id, endDate: null },
        data: { endDate: new Date() },
      });
    });

    revalidatePath("/admin/two-man-teams");

    return {
      success: true,
      message: "Two man team disbanded successfully!",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

/*
  Make sure matches are handled when a team is deleted
  Currently, if a team is deleted, all matches they are in are left with only 1 matchup, 
  causing all kinds of issues
*/
export async function deleteTwoManTeam(id: string) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    await prisma.$transaction(async (tx) => {
      await tx.match.deleteMany({
        where: {
          teams: {
            some: {
              twoManTeamId: id,
            },
          },
        },
      });
      await tx.twoManTeam.delete({ where: { id } });
    });
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
