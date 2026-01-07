/*
  Warnings:

  - You are about to drop the column `playerId` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `golferId` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `golferId` to the `Stats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_twoManTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_playerId_fkey";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "playerId",
ADD COLUMN     "golferId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "playerId",
ADD COLUMN     "golferId" UUID NOT NULL;

-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "Golfer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "hci" DOUBLE PRECISION NOT NULL,
    "twoManTeamId" UUID NOT NULL,

    CONSTRAINT "Golfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Golfer" ADD CONSTRAINT "Golfer_twoManTeamId_fkey" FOREIGN KEY ("twoManTeamId") REFERENCES "TwoManTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_golferId_fkey" FOREIGN KEY ("golferId") REFERENCES "Golfer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_golferId_fkey" FOREIGN KEY ("golferId") REFERENCES "Golfer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
