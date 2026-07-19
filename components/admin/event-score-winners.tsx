import { getEventScoreWinners } from "@/lib/actions/score.actions";
import { convertFloatToFeet } from "@/lib/utils";

interface PropTypes {
  eventId: string;
}

const EventScoreWinners = async ({ eventId }: PropTypes) => {
  const { data: winners } = await getEventScoreWinners(eventId);
  const feetAndInches = convertFloatToFeet(winners?.closestToPin.score ?? 0);
  return (
    <>
      <p>
        <b>Lowest Score:</b>
        {` ${winners?.lowestScore.name} (${winners?.lowestScore.score})`}
      </p>
      <p>
        <b>Closest To Pin:</b>
        {` ${winners?.closestToPin.name} (${feetAndInches.feet}' ${feetAndInches.inches}")`}
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
