-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_golferId_fkey";

-- AlterTable
ALTER TABLE "Score" ALTER COLUMN "year" SET DEFAULT DATE_PART('year', CURRENT_DATE);

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_golferId_fkey" FOREIGN KEY ("golferId") REFERENCES "Golfer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
