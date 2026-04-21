import { getMatchesByEventId } from "@/lib/actions/match.actions";

interface PropTypes {
  eventId: string;
}

const MatchupsList = async ({ eventId }: PropTypes) => {
  const matches = await getMatchesByEventId(eventId);
  console.log(matches.data);

  return <div>MatchupsList</div>;
};

export default MatchupsList;
