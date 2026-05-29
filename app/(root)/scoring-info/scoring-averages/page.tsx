import splash from "@/assets/homepagesplash.avif";
import EventScoreAverages from "@/components/scoring-info/event-score-averages";
import IndividualScoreAverages from "@/components/scoring-info/individual-score-averages";
import WeeklyScoresEventAveragesSkeleton from "@/components/skeletons/weekly-scores-event-averages-skeleton";
import WeeklyScoresIndivAveragesSkeleton from "@/components/skeletons/weekly-scores-indiv-averages-skeleton";
import Image from "next/image";
import { Suspense } from "react";

const ScoringInfoAveragesPage = () => {
  return (
    <article className="p-3 relative">
      <Image
        src={splash}
        alt="golf course"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: -1 }}
      />
      <div className="flex flex-col items-center gap-4">
        <section className="bg-blue-400/80 p-5 min-w-[800px]">
          <h2 className="mb-5 text-2xl text-white font-bold">
            2026 Individual Scoring Averages
          </h2>
          <Suspense fallback={<WeeklyScoresIndivAveragesSkeleton />}>
            <IndividualScoreAverages />
          </Suspense>
        </section>
        <section className="bg-slate-600/80 p-5 min-w-[800px]">
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
