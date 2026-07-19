import { getContestWinnersPublic } from "@/lib/actions/score.actions";
import { convertFloatToFeet } from "@/lib/utils";

const ScoreCards = async () => {
  const contests = await getContestWinnersPublic();
  if (!contests.success || !contests.data) {
    return <>No data found</>;
  }

  const birdiesLeader = contests.data.birdies[0];
  const closestToPinLeader = contests.data.closestToPin[0];
  const snowmenLeader = contests.data.snowmen[0];

  const feetAndInchesWinner = closestToPinLeader
    ? convertFloatToFeet(contests.data.closestToPin[0].lowest)
    : null;

  return (
    <section className="mx-auto max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article className="flex flex-col md:gap-4">
          <div className="bg-sky-600 flex flex-col gap-4 justify-between p-4 text-center text-white">
            <h2 className="font-bold text-3xl">Birdie Busters</h2>
            <div className="text-gray-600 hidden md:block">
              {birdiesLeader ? (
                <>
                  <h3 className="text-2xl font-semibold">{`${birdiesLeader.firstName} ${birdiesLeader.lastName}`}</h3>
                  <h3 className="text-xl font-semibold">
                    {birdiesLeader.average.toFixed(2)}
                  </h3>
                </>
              ) : (
                <h3 className="text-xl font-semibold">No winner yet</h3>
              )}
            </div>
            <p className="font-semibold hidden md:block">Clubhouse Leader</p>
          </div>

          <div className="bg-neutral-700 p-4 text-white">
            <ul>
              {contests.data.birdies.length > 0 ? (
                contests.data.birdies.map((golfer) => (
                  <li
                    key={golfer.id}
                    className="flex justify-between font-semibold text-lg"
                  >
                    <p>{`${golfer.firstName} ${golfer.lastName}`}</p>
                    <p>{golfer.average.toFixed(2)}</p>
                  </li>
                ))
              ) : (
                <li className="font-semibold text-lg">No scores yet</li>
              )}
            </ul>
          </div>
        </article>

        <article className="flex flex-col md:gap-4">
          <div className="bg-sky-600 flex flex-col gap-4 justify-between p-4 text-center text-white">
            <h2 className="font-bold text-3xl">Closest-to-Pin / Hole-in-One</h2>
            <div className="text-gray-600 hidden md:block">
              {closestToPinLeader && feetAndInchesWinner ? (
                <>
                  <h3 className="text-2xl font-semibold">
                    {`${closestToPinLeader.firstName} ${closestToPinLeader.lastName}`}
                  </h3>
                  <h3 className="text-xl font-semibold">
                    {`${feetAndInchesWinner.feet}' ${feetAndInchesWinner.inches}"`}
                  </h3>
                </>
              ) : (
                <h3 className="text-xl font-semibold">No winner yet</h3>
              )}
            </div>
            <p className="font-semibold hidden md:block">Clubhouse Leader</p>
          </div>

          <div className="bg-neutral-700 p-4 text-white">
            <ul>
              {contests.data.closestToPin.length > 0 ? (
                contests.data.closestToPin.map((golfer) => {
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
                })
              ) : (
                <li className="font-semibold text-lg">No scores yet</li>
              )}
            </ul>
          </div>
        </article>

        <article className="flex flex-col md:gap-4">
          <div className="bg-sky-600 flex flex-col gap-4 justify-between p-4 text-center text-white">
            <h2 className="font-bold text-3xl">Snowmen</h2>
            <div className="text-gray-600 hidden md:block">
              {snowmenLeader ? (
                <>
                  <h3 className="text-2xl font-semibold">{`${snowmenLeader.firstName} ${snowmenLeader.lastName}`}</h3>
                  <h3 className="text-xl font-semibold">
                    {snowmenLeader.average.toFixed(2)}
                  </h3>
                </>
              ) : (
                <h3 className="text-xl font-semibold">No winner yet</h3>
              )}
            </div>
            <p className="font-semibold hidden md:block">Clubhouse Leader</p>
          </div>

          <div className="bg-neutral-700 p-4 text-white">
            <ul>
              {contests.data.snowmen.length > 0 ? (
                contests.data.snowmen.map((golfer) => (
                  <li
                    key={golfer.id}
                    className="flex justify-between font-semibold text-lg"
                  >
                    <p>{`${golfer.firstName} ${golfer.lastName}`}</p>
                    <p>{golfer.average.toFixed(2)}</p>
                  </li>
                ))
              ) : (
                <li className="font-semibold text-lg">No scores yet</li>
              )}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ScoreCards;
