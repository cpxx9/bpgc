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
        <h3 className="text-4xl font-black tracking-[0.2em] text-center mb-4 text-yellow-300">
          {event.description.toUpperCase()}
        </h3>
        <h4 className="text-2xl font-extrabold text-[rgb(247,154,14)]">
          DATE: {convertToFormDate(event.date)}
        </h4>
        <h4 className="text-2xl font-extrabold text-[rgb(247,154,14)]">
          COURSE: {event.location.toUpperCase()}
        </h4>
        <h4 className="text-2xl font-extrabold text-[rgb(247,154,14)]">
          CHECK-IN: {convertToFormTime(checkIn)}
        </h4>
        <h4 className="text-2xl font-extrabold text-[rgb(247,154,14)]">
          1ST TEE TIME: {convertToFormTime(event.time)}
        </h4>
        <h4 className="text-xl font-extrabold text-blue-300 underline hover:text-blue-300/75">
          <a target="_blank" href="https://www.nbcconnecticut.com/weather/">
            WEATHER FORECAST (CLICK HERE)
          </a>
        </h4>
      </>
    );
  }
};

export default NextEventCard;
