import splash from "@/assets/homepagesplash.avif";
import EventSchedule from "@/components/schedule/event-schedule";
import EventScheduleSkeleton from "@/components/skeletons/event-schedule-skeleton";
import Image from "next/image";
import { Suspense } from "react";

const SchedulePage = () => {
  return (
    <div className="h-full flex justify-center items-start p-8 relative">
      <Image
        src={splash}
        alt="golf course"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: -1 }}
      />
      <div className="bg-slate-500/90 p-2">
        <h3 className="text-xl font-bold text-white">
          {new Date().getFullYear()} BPGC Schedule
        </h3>
        <Suspense fallback={<EventScheduleSkeleton />}>
          <EventSchedule />
        </Suspense>
        <ul className="mt-5">
          <li className="text-white">
            <i>- Two man Match</i>
          </li>
          <li className="text-white">
            <i>* Two Man Playoff Rounds</i>
          </li>
          <li className="text-blue-600">
            <i>- Special Event!</i>
          </li>
          <li className="text-orange-500">
            <i>- Club Championship</i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SchedulePage;
