import EventScoreAverages from "@/components/scoring-info/event-score-averages";
import IndividualScoreAverages from "@/components/scoring-info/individual-score-averages";
import { Suspense } from "react";

const ScoringInfoAveragesPage = () => {
  return (
    <article className="bg-orange-50 h-full p-3">
      <div className="flex flex-col items-center gap-4">
        <section className="bg-blue-300/70 p-5 min-w-[800px]">
          <h2 className="mb-5 text-2xl text-white font-bold">
            2026 Individual Scoring Averages
          </h2>
          <Suspense fallback={<></>}>
            <IndividualScoreAverages />
          </Suspense>
        </section>
        <section className="bg-slate-300/70 p-5 min-w-[800px]">
          <h2>Weekly League Scoring Averages</h2>
          <Suspense fallback={<></>}>
            <EventScoreAverages />
          </Suspense>
        </section>
      </div>
    </article>
  );
};

export default ScoringInfoAveragesPage;
