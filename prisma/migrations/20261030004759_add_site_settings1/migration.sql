-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bpgcNews" TEXT NOT NULL DEFAULT 'ANY IMPORTANT NEWS OR UPDATES WILL BE POSTED HERE',
    "leagueYear" INTEGER NOT NULL,
    "clubChampionshipYear" INTEGER NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
