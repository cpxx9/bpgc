"use server";

import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { PAGE_SIZE } from "@/lib/constants";
import { formatError } from "@/lib/utils";
import {
  ActionResult,
  ActionResultMessage,
  BgImagesPublic,
  DbImage,
  DbImageAdmin,
  UpdateImage,
} from "@/types";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function createImage(data: {
  url: string;
  key: string;
  fileName: string;
}): Promise<ActionResultMessage> {
  try {
    const image = await prisma.images.create({
      data,
    });

    revalidatePath("/admin/gallery");

    return {
      success: true,
      message: `Image uploaded successfully! (${data.url})`,
    };
  } catch (err) {
    return {
      success: false,
      message: `Image was not saved to the Database! It was uploaded to storage. ${formatError(err)}`,
    };
  }
}

export async function getImageById(
  imageId: string | undefined,
): Promise<ActionResult<DbImageAdmin>> {
  try {
    if (!imageId) throw new Error("No id passed in");
    const image = await prisma.images.findFirst({
      where: { id: imageId },
      select: {
        id: true,
        url: true,
        fileName: true,
        displayed: true,
        isHomeSplash: true,
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
    if (!image) throw new Error("Image not found!");
    return {
      success: true,
      data: image,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
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
        fileName: true,
        displayed: true,
        isHomeSplash: true,
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
        fileName: true,
      },
    });

    console.log(images);

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

export async function getBgImagesPublic(): Promise<
  ActionResult<BgImagesPublic>
> {
  try {
    const data = {} as BgImagesPublic;
    await prisma.$transaction(async (tx) => {
      const home = await prisma.images.findFirst({
        where: { isHomeSplash: true },
        select: {
          id: true,
          url: true,
          displayed: true,
          key: true,
          fileName: true,
        },
      });
      data.home = home as DbImage;

      const schedule = await prisma.images.findFirst({
        where: { isScheduleSplash: true },
        select: {
          id: true,
          url: true,
          displayed: true,
          key: true,
          fileName: true,
        },
      });
      data.schedule = schedule as DbImage;

      const weeklyScores = await prisma.images.findFirst({
        where: { isWeeklyScoresSplash: true },
        select: {
          id: true,
          url: true,
          displayed: true,
          key: true,
          fileName: true,
        },
      });
      data.weeklyScores = weeklyScores as DbImage;

      const scoringAverages = await prisma.images.findFirst({
        where: { isScoringAveragesSplash: true },
        select: {
          id: true,
          url: true,
          displayed: true,
          key: true,
          fileName: true,
        },
      });
      data.scoringAverages = scoringAverages as DbImage;

      const twoManLeague = await prisma.images.findFirst({
        where: { isTwoManLeagueSplash: true },
        select: {
          id: true,
          url: true,
          displayed: true,
          key: true,
          fileName: true,
        },
      });
      data.twoManLeague = twoManLeague as DbImage;

      const clubChampionship = await prisma.images.findFirst({
        where: { isClubChampionshipSplash: true },
        select: {
          id: true,
          url: true,
          displayed: true,
          key: true,
          fileName: true,
        },
      });
      data.clubChampionship = clubChampionship as DbImage;

      const contests = await prisma.images.findFirst({
        where: { isContestsSplash: true },
        select: {
          id: true,
          url: true,
          displayed: true,
          key: true,
          fileName: true,
        },
      });
      data.contests = contests as DbImage;
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

export async function updateImage(
  image: UpdateImage,
): Promise<ActionResultMessage> {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    await prisma.images.update({
      where: { id: image.id },
      data: {
        displayed: image.displayed,
        isHomeSplash: image.isHomeSplash,
        isScheduleSplash: image.isScheduleSplash,
        isWeeklyScoresSplash: image.isWeeklyScoresSplash,
        isScoringAveragesSplash: image.isScoringAveragesSplash,
        isTwoManLeagueSplash: image.isTwoManLeagueSplash,
        isClubChampionshipSplash: image.isClubChampionshipSplash,
        isContestsSplash: image.isContestsSplash,
        isVideoOfTheWeek: image.isVideoOfTheWeek,
        isTwoManChamps: image.isTwoManChamps,
        isBpgcTv: image.isBpgcTv,
      },
    });

    return {
      success: true,
      message: "Image updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function deleteImage(
  id: string,
  key: string,
): Promise<ActionResultMessage> {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    await prisma.$transaction(async (tx) => {
      utapi.deleteFiles(key);
      await prisma.images.delete({ where: { id } });
    });

    revalidatePath("/admin/gallery");
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
