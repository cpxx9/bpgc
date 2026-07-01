import splash from "@/assets/homepagesplash.avif";
import WeeklyScoresEventAveragesSkeleton from "@/components/skeletons/weekly-scores-event-averages-skeleton";
import WeeklyScoresIndivAveragesSkeleton from "@/components/skeletons/weekly-scores-indiv-averages-skeleton";
import Image from "next/image";
import { Suspense } from "react";

const EventsTwoManLeaguePage = () => {
  return (
    <article className="p-3 relative">
      <Image
        src={splash}
        alt="golf course"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: -20 }}
      />
      <div className="-z-10 absolute inset-0 bg-black/30" />
      <div className="flex flex-col items-center gap-4">
        <section className="bg-slate-600/70 p-5 min-w-[800px]">
          <h2 className="mb-5 text-2xl text-white font-bold">
            2026 Two Man Leage Standings
          </h2>
          <Suspense fallback={<WeeklyScoresIndivAveragesSkeleton />}></Suspense>
        </section>
        <section className="bg-blue-400/70 p-5 min-w-[800px]">
          <h2 className="mb-5 text-2xl text-white font-bold">Matchups</h2>
          <Suspense fallback={<WeeklyScoresEventAveragesSkeleton />}></Suspense>
        </section>
      </div>
    </article>
  );
};

export default EventsTwoManLeaguePage;
