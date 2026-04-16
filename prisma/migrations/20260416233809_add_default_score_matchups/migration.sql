/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "eventId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Matchups" ALTER COLUMN "score" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Match_eventId_key" ON "Match"("eventId");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
