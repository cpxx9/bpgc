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
} from "@/lib/actions/two-man-team.actions";
import { getAllGolfersList } from "@/lib/actions/golfer.actions";
import { notFound } from "next/navigation";
import UpdateTwoManTeamForm from "@/components/admin/update-twomanteam-form";

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
  const { data } = await getAllGolfersList();
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
                  <DeleteDialog
                    id={twoManTeam.id}
                    action={disbandTwoManTeam}
                    variant="secondary"
                    text="DISBAND"
                  />
                  <DeleteDialog id={twoManTeam.id} action={deleteTwoManTeam} />
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
