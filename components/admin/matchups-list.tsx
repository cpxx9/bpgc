import { getMatchesByEventId } from "@/lib/actions/match.actions";
import { abbrevName } from "@/lib/utils";

interface PropTypes {
  eventId: string;
}

const MatchupsList = async ({ eventId }: PropTypes) => {
  let { data: matches } = await getMatchesByEventId(eventId);
  if (!matches) {
    matches = [];
  }

  return (
    <ul>
      {matches.map((match) => {
        const teamOne = {
          name: `${abbrevName(
            match.teams[0].twoManTeam.golfers[0],
          )} / ${abbrevName(match.teams[0].twoManTeam.golfers[1])}`,
          score: match.teams[0].score,
        };

        const teamTwo = {
          name: `${abbrevName(
            match.teams[1].twoManTeam.golfers[0],
          )} / ${abbrevName(match.teams[1].twoManTeam.golfers[1])}`,
          score: match.teams[1].score,
        };

        return (
          <li key={match.id}>
            {teamOne.name} vs. {teamTwo.name}
          </li>
        );
      })}
    </ul>
  );
};

export default MatchupsList;
