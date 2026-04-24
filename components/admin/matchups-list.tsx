import UpdateMatchupsForm from "@/components/admin/update-matchups-form";
import DeleteDialog from "@/components/shared/delete-dialog";
import { Button } from "@/components/ui/button";
import { deleteMatch, getMatchesByEventId } from "@/lib/actions/match.actions";
import { abbrevName } from "@/lib/utils";
import { UpdateMatchup } from "@/types";

interface PropTypes {
  eventId: string;
}

const MatchupsList = async ({ eventId }: PropTypes) => {
  let { data: matches } = await getMatchesByEventId(eventId);
  if (!matches) {
    matches = [];
  }

  return (
    <ul className="flex flex-col gap-2">
      {matches.map((match) => {
        const displayNames = {
          teamOne: `${match.teams[0].twoManTeam.number}. ${abbrevName(
            match.teams[0].twoManTeam.golfers[0],
          )} / ${abbrevName(match.teams[0].twoManTeam.golfers[1])}`,
          teamTwo: `${match.teams[0].twoManTeam.number}. ${abbrevName(
            match.teams[1].twoManTeam.golfers[0],
          )} / ${abbrevName(match.teams[1].twoManTeam.golfers[1])}`,
        };

        const matchups: UpdateMatchup = {
          eventId: eventId,
          matchupOneId: match.teams[0].id,
          matchupOneScore: match.teams[0].score,
          matchupTwoId: match.teams[1].id,
          matchupTwoScore: match.teams[1].score,
        };

        return (
          <li key={match.id}>
            <UpdateMatchupsForm
              matchups={matchups}
              displayNames={displayNames}
              matchId={match.id}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default MatchupsList;
