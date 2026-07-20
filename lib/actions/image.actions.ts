import { prisma } from "@/db/prisma";
import { requireAdminAction } from "@/lib/auth-guard";

export async function createImage(data: {
  url: string;
  key: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
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
      message: `Image was not saved to the Database! It was uploaded to storage. formatError(err)`,
    };
  }
}
