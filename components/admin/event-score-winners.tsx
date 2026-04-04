import { getEventScoreWinners } from "@/lib/actions/score.actions";

interface PropTypes {
  eventId: string;
}

const EventScoreWinners = async ({ eventId }: PropTypes) => {
  const { data: winners } = await getEventScoreWinners(eventId);
  console.log(`Lowest Score: ${winners?.lowestScore}`);
  console.log(`Closest To Pin: ${winners?.closestToPin}`);
  console.log(`Most Birdies: ${winners?.mostBirdies}`);
  console.log(`Most Snowmen: ${winners?.mostSnowmen}`);
  return (
    <>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </>
  );
};

export default EventScoreWinners;
