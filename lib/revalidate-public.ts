import { revalidatePath } from "next/cache";

const PUBLIC_ROUTES = {
  images: [
    "/",
    "/contests",
    "/events/club-championship",
    "/events/two-man-league",
    "/gallery",
    "/schedule",
    "/scoring-info/scoring-averages",
    "/scoring-info/weekly-scores",
  ],
  events: [
    "/",
    "/schedule",
    "/events/two-man-league",
    "/scoring-info/scoring-averages",
    "/scoring-info/weekly-scores",
  ],
  teams: ["/events/two-man-league"],
  golfers: [
    "/events/two-man-league",
    "/scoring-info/scoring-averages",
    "/scoring-info/weekly-scores",
  ],
  scores: [
    "/contests",
    "/events/two-man-league",
    "/scoring-info/scoring-averages",
    "/scoring-info/weekly-scores",
  ],
} as const;

export function revalidatePublic(...groups: (keyof typeof PUBLIC_ROUTES)[]) {
  const paths = new Set<string>();
  for (const g of groups) PUBLIC_ROUTES[g].forEach((p) => paths.add(p));
  paths.forEach((p) => revalidatePath(p));
}
