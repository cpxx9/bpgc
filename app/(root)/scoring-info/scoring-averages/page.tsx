import splash from "@/assets/homepagesplash.avif";
import Image from "next/image";
import EventScoreAverages from "@/components/scoring-info/event-score-averages";
import IndividualScoreAverages from "@/components/scoring-info/individual-score-averages";
import WeeklyScoresEventAveragesSkeleton from "@/components/skeletons/weekly-scores-event-averages-skeleton";
import WeeklyScoresIndivAveragesSkeleton from "@/components/skeletons/weekly-scores-indiv-averages-skeleton";
import { Suspense } from "react";

const ScoringInfoAveragesPage = () => {
  return (
    <article className="p-3 relative min-h-[100%]">
      <Image
        src={
          "https://x1h2s6dbph.ufs.sh/f/TnIoxIi73IiaIMZCNRs49rI2nUdFSRvTwcHuxe6QYoPb71kO"
        }
        alt="golf course"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: -20 }}
      />
      <div className="-z-10 absolute inset-0 bg-black/30" />
      <div className="flex flex-col items-center gap-4">
        <section className="bg-blue-400/70 p-5 md:min-w-[800px]">
          <h2 className="mb-5 text-2xl text-white font-bold">
            2026 Individual Scoring Averages
          </h2>
          <Suspense fallback={<WeeklyScoresIndivAveragesSkeleton />}>
            <IndividualScoreAverages />
          </Suspense>
        </section>
        <section className="bg-slate-600/70 p-5 md:min-w-[800px]">
          <h2 className="mb-5 text-2xl text-white font-bold">
            Weekly League Scoring Averages
          </h2>
          <Suspense fallback={<WeeklyScoresEventAveragesSkeleton />}>
            <EventScoreAverages />
          </Suspense>
        </section>
      </div>
    </article>
  );
};

export default ScoringInfoAveragesPage;
