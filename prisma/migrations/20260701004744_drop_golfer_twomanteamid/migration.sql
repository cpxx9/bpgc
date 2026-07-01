/*
  Warnings:

  - You are about to drop the column `twoManTeamId` on the `Golfer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Golfer" DROP CONSTRAINT "Golfer_twoManTeamId_fkey";

-- AlterTable
ALTER TABLE "Golfer" DROP COLUMN "twoManTeamId";
