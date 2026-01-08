/*
  Warnings:

  - You are about to drop the column `leagueWeek` on the `Event` table. All the data in the column will be lost.
  - Added the required column `isLeagueWeek` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "leagueWeek",
ADD COLUMN     "isLeagueWeek" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Stats" ALTER COLUMN "year" SET DEFAULT DATE_PART('year', CURRENT_DATE);
