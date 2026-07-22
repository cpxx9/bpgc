import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";
import { requireAdminAction } from "@/lib/auth-guard";
import { createImage } from "@/lib/actions/image.actions";
import { formatError } from "@/lib/utils";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      const session = await auth();
      const isAdmin = await requireAdminAction();
      if (!session || !isAdmin) throw new UploadThingError("Unauthorized");
      return { userId: session?.user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const actionResult = await createImage({
          url: file.ufsUrl,
          key: file.key,
          fileName: file.name,
        });
        if (!actionResult || !actionResult.success) {
          throw new Error(actionResult?.message || "Database saving failed");
        }
        return { uploadedBy: metadata.userId, actionResult };
      } catch (err) {
        throw new UploadThingError(formatError(err));
      }
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
