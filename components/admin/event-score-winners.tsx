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
        {` ${winners?.lowestScore.name} (${winners?.lowestScore.score})`}
      </p>
      <p>
        <b>Closest To Pin:</b>
        {` ${winners?.closestToPin.name} (${winners?.closestToPin.score})`}
      </p>
      <p>
        <b>Most Birdies:</b>
        {` ${winners?.mostBirdies.name} (${winners?.mostBirdies.score})`}
      </p>
      <p>
        <b>Most Snowmen:</b>
        {` ${winners?.mostSnowmen.name} (${winners?.mostSnowmen.score})`}
      </p>
    </>
  );
};

export default EventScoreWinners;
