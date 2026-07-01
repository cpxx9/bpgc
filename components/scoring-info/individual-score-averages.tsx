import ThreeColList from "@/components/shared/three-col-list";
import { getAllGolfersWithScoreAverages } from "@/lib/actions/golfer.actions";

const IndividualScoreAverages = async () => {
  // Uncomment for delay to test suspense layout
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const result = await getAllGolfersWithScoreAverages();
  if (!result.success) {
    return <>No data found</>;
  }
  const golfers = result.data;
  const chunkSize = Math.ceil(golfers.length / 3);

  const columns = [
    golfers.slice(0, chunkSize),
    golfers.slice(chunkSize, chunkSize * 2),
    golfers.slice(chunkSize * 2),
  ];

  return <ThreeColList columns={columns} />;
};

export default IndividualScoreAverages;
