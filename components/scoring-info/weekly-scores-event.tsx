import { getPreviousEvent } from "@/lib/actions/event.actions";
import { cn } from "@/lib/utils";
import React from "react";

const WeeklyScoresEvent = async () => {
  // Uncomment for delay to test suspense layout
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const result = await getPreviousEvent();
  if (!result.success) {
    return <></>;
  }
  const event = result.data;

  const chunkSize = Math.ceil(event.scores.length / 3);

  const columns = [
    event.scores.slice(0, chunkSize),
    event.scores.slice(chunkSize, chunkSize * 2),
    event.scores.slice(chunkSize * 2),
  ];

  return (
    <section className="flex flex-col gap-6 md:gap-3 w-full md:w-[800px]">
      <section className="text-center bg-blue-400/80 p-6">
        <h2 className="text-3xl text-white font-bold">{event.description}</h2>
        <h2 className="text-3xl text-white font-semibold">
          <i>{event.location}</i>
        </h2>
      </section>
      <section
        className={cn(
          "bg-slate-600/80 p-5 flex flex-col justify-between md:flex-row",
        )}
      >
        {columns.map((col, i) => (
          <div key={i} className="">
            {col.map((score) => (
              <div
                key={score.id}
                className="flex justify-between text-white font-semibold text-lg"
              >
                <p>{`${score.golfer.firstName} ${score.golfer.lastName}`}</p>
                <p className="ml-3">{score.score}</p>
              </div>
            ))}
          </div>
        ))}
      </section>
    </section>
  );
};

export default WeeklyScoresEvent;
