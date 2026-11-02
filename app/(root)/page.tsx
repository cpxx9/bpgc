import NextEventCard from "@/components/home/next-event-card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import NextEventCardSkeleton from "@/components/skeletons/next-event-card-skeleton";
import BackgroundImage from "@/components/shared/background-image";
import CardImage from "@/components/shared/card-image";
import Link from "next/link";
import { Metadata } from "next";
import EventRegistrationForm from "@/components/home/event-registration-form";
import BpgcNews from "@/components/home/bpgc-news";
import BpgcNewsSkeleton from "@/components/skeletons/bpgc-news-skeleton";

export const metadata: Metadata = {
  description:
    "Check out the details for the upcoming event, or checkout some of our latest news. Register now!",
};

const Homepage = () => {
  return (
    <div className="flex flex-col items-center gap-3 mb-12">
      <div className="w-full flex flex-col items-center pt-32 pb-10 gap-4 tracking-widest relative">
        <BackgroundImage page="home" />
        <div className="bg-gray-600/75 py-5 px-4 sm:px-10 pb-14 max-w-full">
          <h2 className="text-4xl sm:text-5xl text-white font-black tracking-[0.1em] sm:tracking-[0.2em] text-center px-0 sm:px-10">
            NEXT OUTING
          </h2>
          <Suspense fallback={<NextEventCardSkeleton />}>
            <NextEventCard />
          </Suspense>
        </div>
        <div>
          <EventRegistrationForm />
        </div>
      </div>
      {/* Cards */}
      <div className="flex flex-col gap-2 md:flex-row px-2 w-full md:w-auto">
        <div className="bg-blue-300 text-center py-4 px-4 sm:px-10 flex flex-col">
          <h3 className="text-2xl font-semibold justify-self-start">
            BPGC IMPORTANT NEWS
          </h3>
          <Suspense fallback={<BpgcNewsSkeleton />}>
            <BpgcNews />
          </Suspense>
        </div>
        <div className="bg-blue-300 text-center py-4 px-10">
          <h3 className="text-2xl font-semibold">2026 TWO MAN CHAMPS!!</h3>
          <CardImage card="isTwoManChamps" />
          <p className="mt-1">
            Congrats to Marcell and George for finally bringing it home!
          </p>
        </div>
        <Link href="/gallery">
          <div className="bg-blue-300 text-center py-4 px-10">
            <h3 className="text-2xl font-semibold">BPGC GALLERY</h3>
            <CardImage card="isBpgcTv" />
            <p className="mt-1 text-wrap">
              Random videos, media and other content.... <br />
              Check it out!
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
