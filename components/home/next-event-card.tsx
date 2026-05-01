import { getNextEvent } from "@/lib/actions/event.actions";

const NextEventCard = async () => {
  const { data: event } = await getNextEvent();
  return (
    <div>
      <h3>Next Outing</h3>
      <h4>{event.description}</h4>
    </div>
  );
};

export default NextEventCard;
