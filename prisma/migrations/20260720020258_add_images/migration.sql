-- CreateTable
CREATE TABLE "Images" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "displayed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);
