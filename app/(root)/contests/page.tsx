import ScoreCards from "@/components/contests/score-cards";
import BackgroundImage from "@/components/shared/background-image";
import ScoreCardsSkeleton from "@/components/skeletons/score-cards-skeleton";
import { Suspense } from "react";

const ContestsPage = () => {
  return (
    <article className="p-3 relative min-h-[100%]">
      <BackgroundImage page="contests" />
      <Suspense fallback={<ScoreCardsSkeleton />}>
        <ScoreCards />
      </Suspense>
    </article>
  );
};

export default ContestsPage;
