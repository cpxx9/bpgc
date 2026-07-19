import { getScoreAveragesForEvents } from "@/lib/actions/score.actions";

const EventScoreAverages = async () => {
  // Uncomment for delay to test suspense layout
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const result = await getScoreAveragesForEvents();
  if (!result.success) {
    return <>No data found</>;
  }

  const events = result.data;
  const chunkSize = Math.ceil(events.length / 2);

  const columns = [events.slice(0, chunkSize), events.slice(chunkSize)];
  return (
    <section className="flex justify-between flex-col md:flex-row">
      {columns.map((col, i) => (
        <div key={i}>
          {col.map((event) => (
            <div
              key={event.id}
              className="flex justify-between text-white font-semibold text-lg"
            >
              <p>{`Week #${event.leagueWeek} - ${event.location}:`}</p>
              <p className="ml-3">
                {event.avgScore === "dnp"
                  ? "DNP"
                  : Math.round(event.avgScore * 100) / 100}
              </p>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default EventScoreAverages;
