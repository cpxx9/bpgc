-- Backfill: convert current Golfer.twoManTeamId into open TeamMembership rows
INSERT INTO "TeamMembership" (id, "golferId", "twoManTeamId", "startDate", "endDate", "createdAt", "updatedAt")
SELECT
  gen_random_uuid(),
  g.id,
  g."twoManTeamId",
  g."createdAt",
  CASE WHEN t.active = false THEN t."updatedAt" ELSE NULL END,
  NOW(),
  NOW()
FROM "Golfer" g
JOIN "TwoManTeam" t ON t.id = g."twoManTeamId"
WHERE g."twoManTeamId" IS NOT NULL;