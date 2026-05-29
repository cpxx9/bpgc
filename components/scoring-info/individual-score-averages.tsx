import { getAllGolfersWithScoreAverages } from "@/lib/actions/golfer.actions";

const IndividualScoreAverages = async () => {
  // Uncomment for delay to test suspense layout
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const result = await getAllGolfersWithScoreAverages();
  if (!result.success) {
    return <></>;
  }
  const golfers = result.data;
  const chunkSize = Math.ceil(golfers.length / 3);

  const columns = [
    golfers.slice(0, chunkSize),
    golfers.slice(chunkSize, chunkSize * 2),
    golfers.slice(chunkSize * 2),
  ];

  return (
    <section className="flex justify-between">
      {columns.map((col, i) => (
        <div key={i} className="">
          {col.map((golfer) => (
            <div
              key={golfer.id}
              className="flex justify-between text-white font-semibold text-lg"
            >
              <p>{`${golfer.firstName} ${golfer.lastName}`}</p>
              <p className="ml-3">{golfer.avgScore}</p>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default IndividualScoreAverages;
