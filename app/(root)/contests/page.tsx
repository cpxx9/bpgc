import splash from "@/assets/homepagesplash.avif";
import ScoreCards from "@/components/contests/score-cards";
import ScoreCardsSkeleton from "@/components/skeletons/score-cards-skeleton";
import Image from "next/image";
import { Suspense } from "react";

const ContestsPage = () => {
  return (
    <article className="p-3 relative min-h-[100%]">
      <Image
        src={
          "https://x1h2s6dbph.ufs.sh/f/TnIoxIi73IiaGUzS80xFomAuWUPYKeZ5tlNwd8bXIg02BzVc"
        }
        alt="golf course"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: -20 }}
      />
      <Suspense fallback={<ScoreCardsSkeleton />}>
        <ScoreCards />
      </Suspense>
    </article>
  );
};

export default ContestsPage;
