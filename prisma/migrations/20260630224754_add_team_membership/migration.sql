-- CreateTable
CREATE TABLE "TeamMembership" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "golferId" UUID NOT NULL,
    "twoManTeamId" UUID NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "TeamMembership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TeamMembership_golferId_idx" ON "TeamMembership"("golferId");

-- CreateIndex
CREATE INDEX "TeamMembership_twoManTeamId_idx" ON "TeamMembership"("twoManTeamId");

-- CreateIndex
CREATE INDEX "TeamMembership_endDate_idx" ON "TeamMembership"("endDate");

-- AddForeignKey
ALTER TABLE "TeamMembership" ADD CONSTRAINT "TeamMembership_golferId_fkey" FOREIGN KEY ("golferId") REFERENCES "Golfer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMembership" ADD CONSTRAINT "TeamMembership_twoManTeamId_fkey" FOREIGN KEY ("twoManTeamId") REFERENCES "TwoManTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
