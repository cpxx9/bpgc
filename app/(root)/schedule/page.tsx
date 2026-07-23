import splash from "@/assets/homepagesplash.avif";
import EventSchedule from "@/components/schedule/event-schedule";
import BackgroundImage from "@/components/shared/background-image";
import EventScheduleSkeleton from "@/components/skeletons/event-schedule-skeleton";
import Image from "next/image";
import { Suspense } from "react";

const SchedulePage = () => {
  return (
    <div className="min-h-[100%] flex justify-center items-start p-1 md:p-8 relative">
      <BackgroundImage page="schedule" />
      <div className="bg-slate-500/90 p-2">
        <h3 className="text-2xl font-bold text-white">
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
