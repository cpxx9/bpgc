"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { PAGE_SIZE } from "@/lib/constants";
import { formatError } from "@/lib/utils";
import {
  ActionResult,
  ActionResultMessage,
  DbImage,
  DbImageAdmin,
} from "@/types";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function createImage(data: {
  url: string;
  key: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const image = await prisma.images.create({
      data,
    });
    return {
      success: true,
      message: `Image uploaded successfully! (${data.url})`,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: `Image was not saved to the Database! It was uploaded to storage. ${formatError(err)}`,
    };
  }
}

export async function getAllImages({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}): Promise<ActionResult<DbImageAdmin[]>> {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const images = await prisma.images.findMany({
      orderBy: { createdAt: "asc" },
      take: limit,
      skip: (page - 1) * limit,
      select: {
        id: true,
        url: true,
        displayed: true,
        isScheduleSplash: true,
        isWeeklyScoresSplash: true,
        isScoringAveragesSplash: true,
        isTwoManLeagueSplash: true,
        isClubChampionshipSplash: true,
        isContestsSplash: true,
        isVideoOfTheWeek: true,
        isTwoManChamps: true,
        isBpgcTv: true,
        key: true,
      },
    });

    const dataCount = await prisma.images.count();

    return {
      success: true,
      data: images,
      totalPages: Math.ceil(dataCount / limit),
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function getDisplayedImagesPublic(): Promise<
  ActionResult<DbImage[]>
> {
  try {
    const images = await prisma.images.findMany({
      where: {
        displayed: true,
      },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        url: true,
        displayed: true,
        key: true,
      },
    });

    return {
      success: true,
      data: images,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function deleteImage(key: string): Promise<ActionResultMessage> {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    return {
      success: true,
      message: "Image deleted successfully!",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}
