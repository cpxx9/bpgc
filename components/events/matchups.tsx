import { getTwoManTeamsPublic } from "@/lib/actions/two-man-team.actions";

const Matchups = async () => {
  // Uncomment for delay to test suspense layout
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const result = await getTwoManTeamsPublic();
  if (!result.success) {
    return <>No data found</>;
  }

  return (
    <>
      <article>data</article>
      <article>
        <ul>
          {result.data.map((team) => (
            <li key={team.id}>{team.number}</li>
          ))}
        </ul>
      </article>
    </>
  );
};

export default Matchups;
