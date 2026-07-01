import { getWeeklyMatchesPublic } from "@/lib/actions/event.actions";
import { getTwoManTeamsPublic } from "@/lib/actions/two-man-team.actions";
import { abbrevName } from "@/lib/utils";

const Matchups = async () => {
  // Uncomment for delay to test suspense layout
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const teamResult = await getTwoManTeamsPublic();
  if (!teamResult.success) {
    return <>No data found</>;
  }

  const matchResult = await getWeeklyMatchesPublic();
  if (!matchResult.success) {
    return <>No data found</>;
  }

  console.log(matchResult);

  return (
    <>
      <article className="grid grid-cols-10 gap-x-4">
        {matchResult.data?.map((w) => (
          <div key={w.week}>
            <h3 className="text-white">Wk. {w.week}</h3>
            <ul>
              {w.matchups.map((m) => (
                <li key={m.id} className={w.completed ? "" : "text-white"}>
                  {m.teamOne} v {m.teamTwo ?? "—"}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </article>

      <article>
        <ul>
          {teamResult.data.map((team) => (
            <li key={team.id} className="text-white flex gap-2">
              <span className="w-6">{team.number}</span>
              <span>{`${abbrevName(team.golfers[0])}/${abbrevName(team.golfers[1])}`}</span>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
};

export default Matchups;
