import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTwoManTeamsStandingsPublic } from "@/lib/actions/event.actions";
import { abbrevName } from "@/lib/utils";

const WEEKS = 10;

const TwoManStandings = async () => {
  const result = await getTwoManTeamsStandingsPublic();
  if (!result.success) {
    return <p>No data found</p>;
  }

  const teams = result.data;

  console.log(teams);

  return (
    <section className="">
      <Table className="">
        <TableHeader>
          <TableRow className="text-white">
            <TableHead className="text-white">TEAM</TableHead>
            {Array.from({ length: WEEKS }, (_, i) => (
              <TableHead key={i + 1} className="text-white">
                {" "}
                Wk. {i + 1}
              </TableHead>
            ))}
            <TableHead className="text-white">* Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell className="">
                {team.golfers.map((g) => abbrevName(g)).join("/")}
              </TableCell>
              {team.weeklyScores.map((w) => (
                <TableCell key={w.week} className="">
                  {w.score === null
                    ? "-"
                    : w.score === "DNP"
                      ? "DNP"
                      : w.score.toFixed(1)}
                </TableCell>
              ))}
              <TableCell className="">{team.total.toFixed(1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default TwoManStandings;
