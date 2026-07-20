import { prisma } from "@/db/prisma";
import { formatError } from "@/lib/utils";
import { ActionResult } from "@/types";

export async function createImage(
  urls: { url: string }[],
): Promise<{ success: boolean; message: string }> {
  try {
    const imageCount = await prisma.images.createMany({
      data: urls,
    });
    return {
      success: true,
      message: `Image uploaded successfully! ()`,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}
