import card from "@/assets/homepagecard.avif";
import Image from "next/image";
import NextEventCard from "@/components/home/next-event-card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import NextEventCardSkeleton from "@/components/skeletons/next-event-card-skeleton";
import BackgroundImage from "@/components/shared/background-image";
import CardImage from "@/components/shared/card-image";
import Link from "next/link";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center gap-3 mb-12">
      <div className="w-full flex flex-col items-center pt-32 pb-10 gap-4 tracking-widest relative">
        <BackgroundImage page="home" />
        <div className="bg-gray-600/75 py-5 px-10 pb-14">
          <h2 className="text-5xl text-white font-black tracking-[0.2em] text-center px-10">
            NEXT OUTING
          </h2>
          <Suspense fallback={<NextEventCardSkeleton />}>
            <NextEventCard />
          </Suspense>
        </div>
        <div>
          <Button className="rounded-full tracking-[0.4em] font-semibold py-8 px-7 text-md">
            REGISTER ONLINE HERE
          </Button>
        </div>
      </div>
      {/* Cards */}
      <div className="flex flex-col gap-2 md:flex-row px-2">
        <div className="bg-blue-300 text-center py-4 px-10 flex flex-col">
          <h3 className="text-2xl font-semibold justify-self-start">
            BPGC IMPORTANT NEWS
          </h3>
          <p className="w-[400px] m-auto text-lg">
            <em>
              ANY IMPORTANT NEWS OR UPDATES <br /> WILL BE POSTED HERE
            </em>
          </p>
        </div>
        <div className="bg-blue-300 text-center py-4 px-10">
          <h3 className="text-2xl font-semibold">
            {new Date().getFullYear() - 1} TWO MAN CHAMPS!!
          </h3>
          <CardImage card="isTwoManChamps" />
          <p className="mt-1">ANOTHER CHAMPIONSHIP!</p>
        </div>
        <Link href="/gallery">
          <div className="bg-blue-300 text-center py-4 px-10">
            <h3 className="text-2xl font-semibold">BPGC TV</h3>
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
