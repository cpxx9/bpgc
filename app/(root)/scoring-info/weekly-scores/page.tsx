import splash from "@/assets/homepagesplash.avif";
import Image from "next/image";
import WeeklyScoresEvent from "@/components/scoring-info/weekly-scores-event";
import WeeklyScoresEventSkeleton from "@/components/skeletons/weekly-scores-event-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const ScoringInfoWeeklyScoresPage = () => {
  return (
    <div className="h-[500px] flex flex-col justify-center items-center gap-3 relative">
      <Image
        src={splash}
        alt="golf course"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: -1 }}
      />
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
