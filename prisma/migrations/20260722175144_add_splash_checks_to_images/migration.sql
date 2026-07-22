-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "isClubChampionshipSplash" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isContestsSplash" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isHomeSplash" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isScheduleSplash" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isScoringAveragesSplash" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTwoManLeagueSplash" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isWeeklyScoresSplash" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "displayed" SET DEFAULT false;
