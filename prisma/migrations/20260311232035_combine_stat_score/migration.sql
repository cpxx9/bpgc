/*
  Warnings:

  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_golferId_fkey";

-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "birdies" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "closestToPin" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "snowmen" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "year" INTEGER NOT NULL DEFAULT DATE_PART('year', CURRENT_DATE),
ALTER COLUMN "score" SET DEFAULT 0;

-- DropTable
DROP TABLE "Stats";
