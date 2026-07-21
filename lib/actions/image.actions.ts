import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";
import { formatError } from "@/lib/utils";
import { ActionResult, DbImage } from "@/types";

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

export async function getAllImages(): Promise<ActionResult<DbImage[]>> {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const images = await prisma.images.findMany({
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
