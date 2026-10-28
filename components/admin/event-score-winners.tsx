import { getEventScoreWinners } from "@/lib/actions/score.actions";
import { convertFloatToFeet } from "@/lib/utils";

interface PropTypes {
  eventId: string;
}

const EventScoreWinners = async ({ eventId }: PropTypes) => {
  const { data: winners } = await getEventScoreWinners(eventId);

  const ctp = winners?.closestToPin.score;
  const ctpText =
    ctp == null
      ? ""
      : (() => {
          const { feet, inches } = convertFloatToFeet(ctp);
          return ` (${feet}' ${inches}")`;
        })();

  const withScore = (name?: string, score?: number | string) =>
    ` ${name}${score !== "" && score != null ? ` (${score})` : ""}`;

  return (
    <>
      <p>
        <b>Lowest Score:</b>
        {withScore(winners?.lowestScore.name, winners?.lowestScore.score)}
      </p>
      <p>
        <b>Closest To Pin:</b>
        {` ${winners?.closestToPin.name}${ctpText}`}
      </p>
      <p>
        <b>Most Birdies:</b>
        {withScore(winners?.mostBirdies.name, winners?.mostBirdies.score)}
      </p>
      <p>
        <b>Most Snowmen:</b>
        {withScore(winners?.mostSnowmen.name, winners?.mostSnowmen.score)}
      </p>
    </>
  );
};

export default EventScoreWinners;
