/*
  Warnings:

  - Made the column `score` on table `Score` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birdies` on table `Score` required. This step will fail if there are existing NULL values in that column.
  - Made the column `closestToPin` on table `Score` required. This step will fail if there are existing NULL values in that column.
  - Made the column `snowmen` on table `Score` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `Score` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Score" ALTER COLUMN "score" SET NOT NULL,
ALTER COLUMN "birdies" SET NOT NULL,
ALTER COLUMN "closestToPin" SET NOT NULL,
ALTER COLUMN "snowmen" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL;
