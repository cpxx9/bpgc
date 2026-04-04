import { getEventScoreWinners } from "@/lib/actions/score.actions";

interface PropTypes {
  eventId: string;
}

const EventScoreWinners = async ({ eventId }: PropTypes) => {
  const { data: winners } = await getEventScoreWinners(eventId);
  return (
    <>
      <p>
        <b>Lowest Score:</b>
        {` ${winners?.lowestScore}`}
      </p>
      <p>
        <b>Closest To Pin:</b>
        {` ${winners?.closestToPin}`}
      </p>
      <p>
        <b>Most Birdies:</b>
        {` ${winners?.mostBirdies}`}
      </p>
      <p>
        <b>Most Snowmen:</b>
        {` ${winners?.mostSnowmen}`}
      </p>
    </>
  );
};

export default EventScoreWinners;
