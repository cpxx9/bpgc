import EventScoreAverages from "@/components/scoring-info/event-score-averages";
import IndividualScoreAverages from "@/components/scoring-info/individual-score-averages";
import { Suspense } from "react";

const ScoringInfoAveragesPage = () => {
  return (
    <>
      <section>
        <h2>2026 Individual Scoring Averages</h2>
        <Suspense fallback={<></>}>
          <IndividualScoreAverages />
        </Suspense>
      </section>
      <section>
        <h2>Weekly League Scoring Averages</h2>
        <Suspense fallback={<></>}>
          <EventScoreAverages />
        </Suspense>
      </section>
    </>
  );
};

export default ScoringInfoAveragesPage;
