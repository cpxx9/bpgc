"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { formatError } from "@/lib/utils";
import { ActionResult, SiteSettings } from "@/types";

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
