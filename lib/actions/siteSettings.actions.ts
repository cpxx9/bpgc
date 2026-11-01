"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { revalidatePublic } from "@/lib/revalidate-public";
import { formatError } from "@/lib/utils";
import {
  ActionResult,
  ActionResultMessage,
  SiteSettings,
  UpdateSiteSettings,
} from "@/types";
import { revalidatePath } from "next/cache";

export async function getSiteSettings(): Promise<ActionResult<SiteSettings>> {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    const siteSettings = await prisma.siteSettings.findFirst();

    if (!siteSettings) throw new Error("Could not find any settings!");

    return {
      success: true,
      data: siteSettings,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function getBpgcNews(): Promise<ActionResult<string>> {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    const siteSettings = await prisma.siteSettings.findFirst({
      select: {
        bpgcNews: true,
      },
    });

    if (!siteSettings) throw new Error("Could not find any settings!");

    return {
      success: true,
      data: siteSettings.bpgcNews,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function getLeagueYear(): Promise<ActionResult<number>> {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    const siteSettings = await prisma.siteSettings.findFirst({
      select: {
        leagueYear: true,
      },
    });

    if (!siteSettings) throw new Error("Could not find any settings!");

    return {
      success: true,
      data: siteSettings.leagueYear,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function getClubChampionShipYear(): Promise<ActionResult<number>> {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    const siteSettings = await prisma.siteSettings.findFirst({
      select: {
        clubChampionshipYear: true,
      },
    });

    if (!siteSettings) throw new Error("Could not find any settings!");

    return {
      success: true,
      data: siteSettings.clubChampionshipYear,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function getTwoManLeagueYear(): Promise<ActionResult<number>> {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    const siteSettings = await prisma.siteSettings.findFirst({
      select: {
        twoManLeagueYear: true,
      },
    });

    if (!siteSettings) throw new Error("Could not find any settings!");

    return {
      success: true,
      data: siteSettings.twoManLeagueYear,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function updateSiteSettings(
  siteSettings: UpdateSiteSettings,
): Promise<ActionResultMessage> {
  try {
    const admin = await requireAdminAction();

    await prisma.siteSettings.update({
      where: { id: siteSettings.id },
      data: {
        bpgcNews:
          siteSettings.bpgcNews !== null ? siteSettings.bpgcNews : undefined,
        leagueYear: siteSettings.leagueYear,
        clubChampionshipYear: siteSettings.clubChampionshipYear,
        twoManLeagueYear: siteSettings.twoManLeagueYear,
        updatedBy:
          siteSettings.updatedBy !== null ? siteSettings.updatedBy : undefined,
      },
    });

    revalidatePath("/admin/overview");
    revalidatePublic("news");

    return {
      success: true,
      message: "Settings updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}
