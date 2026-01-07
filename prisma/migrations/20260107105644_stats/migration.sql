/*
  Warnings:

  - You are about to drop the column `birdies` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `closestToPin` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `roundsPlayed` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `snowmen` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "birdies",
DROP COLUMN "closestToPin",
DROP COLUMN "roundsPlayed",
DROP COLUMN "snowmen";

-- CreateTable
CREATE TABLE "Stats" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "playerId" UUID NOT NULL,
    "year" INTEGER NOT NULL,
    "birdies" INTEGER NOT NULL DEFAULT 1,
    "snowmen" INTEGER NOT NULL DEFAULT 1,
    "roundsPlayed" INTEGER NOT NULL DEFAULT 1,
    "closestToPin" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
