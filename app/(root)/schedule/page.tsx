import EventSchedule from "@/components/schedule/event-schedule";

const SchedulePage = () => {
  return (
    <div className="bg-blue-300 h-full flex justify-center items-start p-8">
      <div className="bg-gray-400/80 p-2">
        <h3 className="text-xl font-bold">
          {new Date().getFullYear()} BPGC Schedule
        </h3>
        <EventSchedule />
      </div>
    </div>
  );
};

export default SchedulePage;
