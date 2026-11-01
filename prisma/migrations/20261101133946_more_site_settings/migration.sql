/*
  Warnings:

  - Added the required column `twoManLeagueYear` to the `SiteSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SiteSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN     "twoManLeagueYear" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" TEXT;
