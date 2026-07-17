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

  return (
    <section className="overflow-x-auto">
      <Table className="text-white border-collapse w-full text-lg">
        <TableHeader className="text-xl">
          <TableRow className="text-left">
            <TableHead className="px-0 font-bold text-white">TEAM</TableHead>
            {Array.from({ length: WEEKS }, (_, i) => (
              <TableHead
                key={i + 1}
                className="px-1 text-right font-bold whitespace-nowrap text-white"
              >
                Wk. {i + 1}
              </TableHead>
            ))}
            <TableHead className="px-0 text-right font-bold whitespace-nowrap text-white">
              * Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id} className="border-white/50">
              <TableCell className="px-0 py-1 font-bold whitespace-nowrap">
                {team.golfers.map((g) => abbrevName(g)).join("/")}
              </TableCell>
              {team.weeklyScores.map((w) => (
                <TableCell
                  key={w.week}
                  className="px-0 py-0 text-center whitespace-nowrap"
                >
                  {w.score === null
                    ? "-"
                    : w.score === "DNP"
                      ? "DNP"
                      : w.score.toFixed(1)}
                </TableCell>
              ))}
              <TableCell className="px-0 py-0 text-right font-bold">
                {team.total.toFixed(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default TwoManStandings;
