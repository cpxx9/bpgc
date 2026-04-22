import { getMatchesByEventId } from "@/lib/actions/match.actions";

interface PropTypes {
  eventId: string;
}

const MatchupsList = async ({ eventId }: PropTypes) => {
  let { data: matches } = await getMatchesByEventId(eventId);
  if (!matches) {
    matches = [];
  }
  console.log(matches);

  return (
    <ul>
      {matches.map((match) => (
        <li key={match.id}>
          {match.teams[0].twoManTeam.golfers[0].lastName}/
          {match.teams[0].twoManTeam.golfers[1].lastName} vs.{" "}
          {match.teams[1].twoManTeam.golfers[0].lastName}/
          {match.teams[1].twoManTeam.golfers[1].lastName}
        </li>
      ))}
    </ul>
  );
};

export default MatchupsList;
