/*
  Warnings:

  - Made the column `updatedBy` on table `SiteSettings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SiteSettings" ALTER COLUMN "updatedBy" SET NOT NULL;
