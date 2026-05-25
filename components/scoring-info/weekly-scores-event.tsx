import { getPreviousEvent } from "@/lib/actions/event.actions";
import React from "react";

const WeeklyScoresEvent = async () => {
  // Uncomment for delay to test suspense layout
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const { data: event } = await getPreviousEvent();
  if (!event) {
    return <></>;
  } else {
    return (
      <div>
        <div>
          <h2>{event.description}</h2>
          <h2>{event.location}</h2>
        </div>
        <div>bottom</div>
      </div>
    );
  }
};

export default WeeklyScoresEvent;
