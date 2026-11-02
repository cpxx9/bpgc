import ThreeColList from "@/components/shared/three-col-list";
import { getAllGolfersWithScoreAverages } from "@/lib/actions/golfer.actions";
import { getLeagueYear } from "@/lib/actions/siteSettings.actions";

const IndividualScoreAverages = async () => {
  // Uncomment for delay to test suspense layout
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const yearResult = await getLeagueYear();
  const result = await getAllGolfersWithScoreAverages();
  console.log(result);
  console.log(yearResult);
  if (!result.success || !yearResult.success) {
    return (
      <>
        <h2 className="mb-5 text-2xl text-white font-bold">
          {new Date().getFullYear()} Individual Scoring Averages
        </h2>
        No averages for the season yet!
      </>
    );
  }
  const golfers = result.data;
  const chunkSize = Math.ceil(golfers.length / 3);

  const columns = [
    golfers.slice(0, chunkSize),
    golfers.slice(chunkSize, chunkSize * 2),
    golfers.slice(chunkSize * 2),
  ];

  return (
    <>
      <h2 className="mb-5 text-2xl text-white font-bold">
        {yearResult.data} Individual Scoring Averages
      </h2>
      <ThreeColList columns={columns} />
    </>
  );
};

export default IndividualScoreAverages;
