import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";
import DeleteDialog from "@/components/shared/delete-dialog";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { shortenUuid } from "@/lib/utils";
import Link from "next/link";
import CreateTwoManTeamForm from "@/components/admin/create-two-man-team-form";
import {
  deleteTwoManTeam,
  disbandTwoManTeam,
  getAllTwoManTeams,
  reinstateTwoManTeam,
} from "@/lib/actions/two-man-team.actions";
import { getFreeAgents } from "@/lib/actions/golfer.actions";
import { notFound } from "next/navigation";
import UpdateTwoManTeamForm from "@/components/admin/update-twomanteam-form";
import DisbandDialog from "@/components/admin/disband-dialog";

export const metadata: Metadata = {
  title: "Admin Two Man Teams",
};

interface PropTypes {
  searchParams: Promise<{ page: string }>;
}

const AdminTwoManTeamsPage = async ({ searchParams }: PropTypes) => {
  await requireAdmin();
  const { page = "1" } = await searchParams;
  const pageParam = Number(page);
  const twoManTeams = await getAllTwoManTeams({ page: pageParam });
  const { data } = await getFreeAgents();
  if (!data) notFound();
  if (!twoManTeams.totalPages) twoManTeams.totalPages = 1;

  return (
    <div className="space-y-2 flex-1">
      <div className="flex justify-between">
        <h2 className="h2-bold">Two Man Teams</h2>
        <CreateTwoManTeamForm golfers={data} />
      </div>
      <div className="overflow-x-auto">
        {twoManTeams?.totalPages > 1 ? (
          <Pagination
            page={Number(page) || 1}
            totalPages={twoManTeams?.totalPages}
          />
        ) : (
          <p className="text-muted-foreground">Displaying all results...</p>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>Team Number</TableHead>
              <TableHead>Golfer 1</TableHead>
              <TableHead>Golfer 2</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {twoManTeams.data?.map((twoManTeam) => (
              <TableRow key={twoManTeam.id}>
                <TableCell>{shortenUuid(twoManTeam.id)}</TableCell>
                <TableCell>
                  <Badge variant={twoManTeam.active ? "default" : "secondary"}>
                    <span>{twoManTeam.active ? "Active" : "Disbanded"}</span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <UpdateTwoManTeamForm
                    updateInfo={{
                      teamId: twoManTeam.id,
                      number: twoManTeam.number,
                    }}
                  />
                </TableCell>
                <TableCell>
                  {twoManTeam?.golfers[0]?.firstName}{" "}
                  {twoManTeam?.golfers[0]?.lastName}
                </TableCell>
                <TableCell>
                  {twoManTeam?.golfers[1]?.firstName}{" "}
                  {twoManTeam?.golfers[1]?.lastName}
                </TableCell>
                <TableCell className="flex gap-2">
                  {twoManTeam.active ? (
                    <DisbandDialog
                      id={twoManTeam.id}
                      action={disbandTwoManTeam}
                    />
                  ) : (
                    <DisbandDialog
                      id={twoManTeam.id}
                      action={reinstateTwoManTeam}
                      text="REINSTATE"
                      description="This will re-instate a team that has been disbanded. Use rather than re-creating the team again. Golfers must not be on any other active team!"
                    />
                  )}
                  <DeleteDialog
                    id={twoManTeam.id}
                    action={deleteTwoManTeam}
                    description="This will delete the team completely, removing all previous matches and scores from history. USE WITH CAUTION!"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminTwoManTeamsPage;
