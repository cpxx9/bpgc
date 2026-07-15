import { getTwoManTeamsStandingsPublic } from "@/lib/actions/two-man-team.actions";

const WEEKS = 10;

const TwoManStandings = async () => {
  const result = await getTwoManTeamsStandingsPublic();
  if (!result.success) {
    return;
    <p>No data found</p>;
  }

  return (
    <section>
      <p>test</p>
    </section>
  );
};

export default TwoManStandings;
