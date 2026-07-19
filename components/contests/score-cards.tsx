import { getContestWinnersPublic } from "@/lib/actions/score.actions";
import { convertFloatToFeet } from "@/lib/utils";

const ScoreCards = async () => {
  const contests = await getContestWinnersPublic();
  if (!contests.success) {
    return <>No data found</>;
  }

  const feetAndInchesWinner = convertFloatToFeet(
    contests.data.closestToPin[0].lowest,
  );

  return (
    <section className="mx-auto max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article className="flex flex-col gap-4">
          <div className="bg-sky-600/80 h-44 flex flex-col justify-between p-4 text-center text-white">
            <h2 className="font-bold text-3xl">Birdie Busters</h2>
            <div className="text-gray-600">
              <h3 className="text-2xl font-semibold">{`${contests.data.birdies[0].firstName} ${contests.data.birdies[0].lastName}`}</h3>
              <h3 className="text-xl font-semibold">
                {contests.data.birdies[0].average.toFixed(2)}
              </h3>
            </div>
            <p className="font-semibold">Clubhouse Leader</p>
          </div>

          <div className="bg-neutral-700 p-4 text-white">
            <ul>
              {contests.data.birdies.map((golfer) => (
                <li
                  key={golfer.id}
                  className="flex justify-between font-semibold text-lg"
                >
                  <p>{`${golfer.firstName} ${golfer.lastName}`}</p>
                  <p>{golfer.average.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="flex flex-col gap-4">
          <div className="bg-sky-600/80 h-44 flex flex-col justify-between p-4 text-center text-white">
            <h2 className="font-bold text-3xl">Closest-to-Pin / Hole-in-One</h2>
            <div className="text-gray-600">
              <h3 className="text-2xl font-semibold">{`${contests.data.closestToPin[0].firstName} ${contests.data.closestToPin[0].lastName}`}</h3>
              <h3 className="text-xl font-semibold">
                {`${feetAndInchesWinner.feet}' ${feetAndInchesWinner.inches}"`}
              </h3>
            </div>
            <p className="font-semibold">Clubhouse Leader</p>
          </div>

          <div className="bg-neutral-700 p-4 text-white">
            <ul>
              {contests.data.closestToPin.map((golfer) => {
                const feetAndInches = convertFloatToFeet(golfer.lowest);

                return (
                  <li
                    key={golfer.id}
                    className="flex justify-between font-semibold text-lg"
                  >
                    <p>{`${golfer.firstName} ${golfer.lastName}`}</p>
                    <p>{`${feetAndInches.feet}' ${feetAndInches.inches}"`}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </article>

        <article className="flex flex-col gap-4">
          <div className="bg-sky-600/80 h-44 flex flex-col justify-between p-4 text-center text-white">
            <h2 className="font-bold text-3xl">Snowmen</h2>
            <div className="text-gray-600">
              <h3 className="text-2xl font-semibold">{`${contests.data.snowmen[0].firstName} ${contests.data.snowmen[0].lastName}`}</h3>
              <h3 className="text-xl font-semibold">
                {contests.data.snowmen[0].average.toFixed(2)}
              </h3>
            </div>
            <p className="font-semibold">Clubhouse Leader</p>
          </div>

          <div className="bg-neutral-700 p-4 text-white">
            <ul>
              {contests.data.snowmen.map((golfer) => (
                <li
                  key={golfer.id}
                  className="flex justify-between font-semibold text-lg"
                >
                  <p>{`${golfer.firstName} ${golfer.lastName}`}</p>
                  <p>{golfer.average.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ScoreCards;
