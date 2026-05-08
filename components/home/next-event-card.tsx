import { getNextEvent } from "@/lib/actions/event.actions";
import { convertToFormDate, convertToFormTime } from "@/lib/utils";

const NextEventCard = async () => {
  const { data: event } = await getNextEvent();
  if (!event) {
    return <></>;
  } else {
    const checkIn = new Date(event.time);
    checkIn.setMinutes(checkIn.getMinutes() - 30);
    return (
      <>
        <h3 className="text-3xl font-bold tracking-[0.2em] text-center mb-4">
          {event.description.toUpperCase()}
        </h3>
        <h4 className="text-xl font-semibold">
          DATE: {convertToFormDate(event.date)}
        </h4>
        <h4 className="text-xl font-semibold">
          COURSE: {event.location.toUpperCase()}
        </h4>
        <h4 className="text-xl font-semibold">
          CHECK-IN: {convertToFormTime(checkIn)}
        </h4>
        <h4 className="text-xl font-semibold">
          1ST TEE TIME: {convertToFormTime(event.time)}
        </h4>
        <h4 className="text-xl font-semibold text-blue-500 underline hover:text-blue-500/75">
          <a href="https://www.nbcconnecticut.com/weather/">
            WEATHER FORECAST (CLICK HERE)
          </a>
        </h4>
      </>
    );
  }
};

export default NextEventCard;
