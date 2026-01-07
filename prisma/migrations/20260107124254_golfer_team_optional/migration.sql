-- DropForeignKey
ALTER TABLE "Golfer" DROP CONSTRAINT "Golfer_twoManTeamId_fkey";

-- AlterTable
ALTER TABLE "Golfer" ALTER COLUMN "twoManTeamId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Golfer" ADD CONSTRAINT "Golfer_twoManTeamId_fkey" FOREIGN KEY ("twoManTeamId") REFERENCES "TwoManTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
