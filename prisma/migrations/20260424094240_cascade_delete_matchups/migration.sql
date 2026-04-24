-- DropForeignKey
ALTER TABLE "Matchups" DROP CONSTRAINT "Matchups_matchId_fkey";

-- DropForeignKey
ALTER TABLE "Matchups" DROP CONSTRAINT "Matchups_twoManTeamId_fkey";

-- AddForeignKey
ALTER TABLE "Matchups" ADD CONSTRAINT "Matchups_twoManTeamId_fkey" FOREIGN KEY ("twoManTeamId") REFERENCES "TwoManTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matchups" ADD CONSTRAINT "Matchups_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
