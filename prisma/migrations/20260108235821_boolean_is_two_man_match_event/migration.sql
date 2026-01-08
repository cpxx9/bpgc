/*
  Warnings:

  - You are about to drop the column `isLeagueWeek` on the `Event` table. All the data in the column will be lost.
  - Added the required column `isTwoManMatch` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leagueWeek` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "isLeagueWeek",
ADD COLUMN     "isTwoManMatch" BOOLEAN NOT NULL,
ADD COLUMN     "leagueWeek" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stats" ALTER COLUMN "year" SET DEFAULT DATE_PART('year', CURRENT_DATE);
