import splash from "@/assets/homepagesplash.avif";
import Image from "next/image";
import WeeklyScoresEvent from "@/components/scoring-info/weekly-scores-event";
import WeeklyScoresEventSkeleton from "@/components/skeletons/weekly-scores-event-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const ScoringInfoWeeklyScoresPage = () => {
  return (
    <div className="min-h-[100%] flex flex-col justify-center items-center gap-3 relative p-6 md:p-0">
      <Image
        src={
          "https://x1h2s6dbph.ufs.sh/f/TnIoxIi73IialcC47xyf1RPX6CsrjH4yGdBeLmnq5NuYiv0A"
        }
        alt="golf course"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: -20 }}
      />
      <div className="-z-10 absolute inset-0 bg-black/30" />
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
