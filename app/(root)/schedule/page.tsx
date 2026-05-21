import EventSchedule from "@/components/schedule/event-schedule";

const SchedulePage = () => {
  return (
    <div className="bg-blue-300 h-full flex justify-center items-start p-8">
      <div className="bg-gray-400/80 p-2">
        <h3 className="text-xl font-bold text-white">
          {new Date().getFullYear()} BPGC Schedule
        </h3>
        <EventSchedule />
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
