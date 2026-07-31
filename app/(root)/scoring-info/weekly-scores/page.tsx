import WeeklyScoresEvent from "@/components/scoring-info/weekly-scores-event";
import WeeklyScoresEventSkeleton from "@/components/skeletons/weekly-scores-event-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import BackgroundImage from "@/components/shared/background-image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Scores",
  description: "Check out the scores from the previous event!",
};

const ScoringInfoWeeklyScoresPage = () => {
  return (
    <div className="min-h-[100%] flex flex-col justify-center items-center gap-3 relative p-6 md:p-0">
      <BackgroundImage page="weeklyScores" />
      <Suspense fallback={<WeeklyScoresEventSkeleton />}>
        <WeeklyScoresEvent />
      </Suspense>
      <Button>
        <Link href="/scoring-info/scoring-averages">
          Click Here for Season Averages
        </Link>
      </Button>
    </div>
  );
};

export default ScoringInfoWeeklyScoresPage;
