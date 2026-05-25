import { getAllGolfersWithScoreAverages } from "@/lib/actions/golfer.actions";

const IndividualScoreAverages = async () => {
  const result = await getAllGolfersWithScoreAverages();
  if (!result.success) {
    return <></>;
  }
  const golfers = result.data;
  console.log(golfers);
  return (
    <div>
      <div>scores</div>
    </div>
  );
};

export default IndividualScoreAverages;
