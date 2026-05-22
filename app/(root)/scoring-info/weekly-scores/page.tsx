import WeeklyScoresEvent from "@/components/scoring-info/weekly-scores-event";
import { Suspense } from "react";

const ScoringInfoWeeklyScoresPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <div>pre-top</div>
            <div>pre-bottom</div>
          </div>
        }
      >
        <WeeklyScoresEvent />
      </Suspense>
    </div>
  );
};

export default ScoringInfoWeeklyScoresPage;
