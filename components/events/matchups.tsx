import { getTwoManTeamsPublic } from "@/lib/actions/two-man-team.actions";
import { abbrevName } from "@/lib/utils";

const Matchups = async () => {
  // Uncomment for delay to test suspense layout
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const result = await getTwoManTeamsPublic();
  if (!result.success) {
    return <>No data found</>;
  }

  return (
    <>
      <article>data</article>
      <article>
        <ul>
          {result.data.map((team) => (
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
