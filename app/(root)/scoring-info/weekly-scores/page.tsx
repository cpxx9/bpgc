import WeeklyScoresEvent from "@/components/scoring-info/weekly-scores-event";
import WeeklyScoresEventSkeleton from "@/components/skeletons/weekly-scores-event-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const ScoringInfoWeeklyScoresPage = () => {
  return (
    <div className="h-[500px] bg-orange-50 flex flex-col justify-center items-center gap-3">
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
