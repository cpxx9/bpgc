import ScoreCards from "@/components/contests/score-cards";
import BackgroundImage from "@/components/shared/background-image";
import ScoreCardsSkeleton from "@/components/skeletons/score-cards-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Contests",
  description:
    "View the standings for our various contests throughout the year. Birdie Buster, Closest to the Pin, and Most Snowmen (8's on a hole)",
};

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
