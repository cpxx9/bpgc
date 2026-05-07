import { getNextEvent } from "@/lib/actions/event.actions";
import { convertToFormDate, convertToFormTime } from "@/lib/utils";

const NextEventCard = async () => {
  const { data: event } = await getNextEvent();
  if (!event) {
    return <></>;
  } else {
    return (
      <>
        <h3 className="text-3xl font-bold">{event.description}</h3>
        <h4>DATE: {convertToFormDate(event.date)}</h4>
        <h4>TIME: {convertToFormTime(event.time)}</h4>
      </>
    );
  }
};

export default NextEventCard;
