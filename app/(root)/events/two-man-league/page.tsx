import splash from "@/assets/homepagesplash.avif";
import Matchups from "@/components/events/matchups";
import TwoManStandings from "@/components/events/two-man-standings";
import MatchupsSkeleton from "@/components/skeletons/matchups-skeleton";
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
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 w-fit">
          <section className="w-full bg-slate-600/70 p-5 max-w-[1100px] flex flex-col gap-5 text-white">
            <h2 className="text-3xl text-white font-bold">
              2026 Two Man Leage Standings
            </h2>
            <Suspense fallback={<WeeklyScoresIndivAveragesSkeleton />}>
              <TwoManStandings />
            </Suspense>
            <section className="font-semibold">
              <p>
                *
                <em className="underline ml-4">
                  Standings will reflect the two lowest scores dropped after
                  week 6
                </em>
              </p>
              <p>
                **
                <span className="mx-2">
                  Top <span className="text-[rgb(121,175,19)]">4 teams</span>{" "}
                  automatically make the Round of 8 playoff matches; teams
                  ranked{" "}
                  <span className="text-[rgb(114,198,229)]">
                    #5 - #12 play on wildcard
                  </span>{" "}
                  weekend for the final 4 spots
                </span>
                **
              </p>
            </section>
          </section>
          <section className="w-full bg-blue-400/70 p-5 max-w-[1100px] grid grid-cols-[1fr_auto] gap-x-8">
            <h2 className="text-2xl text-white font-bold">Matchups</h2>
            <h2 className="text-2xl text-white font-bold">Teams</h2>
            <Suspense fallback={<MatchupsSkeleton />}>
              <Matchups />
            </Suspense>
          </section>
        </div>
      </div>
    </article>
  );
};

export default EventsTwoManLeaguePage;
