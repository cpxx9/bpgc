import { getEventSchedule } from "@/lib/actions/event.actions";

const EventSchedule = async () => {
  const eventSchedule = await getEventSchedule();
  return (
    <div>
      <p>test</p>
    </div>
  );
};

export default EventSchedule;
