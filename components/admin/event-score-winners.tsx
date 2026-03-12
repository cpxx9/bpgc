import { getEventScoreWinners } from "@/lib/actions/score.actions";

interface PropTypes {
  eventId: string;
}

const EventScoreWinners = async ({ eventId }: PropTypes) => {
  const winners = await getEventScoreWinners(eventId);
  console.log(winners);
  return (
    <>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </>
  );
};

export default EventScoreWinners;
