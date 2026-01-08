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
  getAllTwoManTeams,
} from "@/lib/actions/two-man-team.actions";
import { getAllGolfersList } from "@/lib/actions/golfer.actions";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Two Man Teams",
};

interface PropTypes {
  searchParams: Promise<{ page: string }>;
}

const AdminTwoManTeamsPage = async ({ searchParams }: PropTypes) => {
  await requireAdmin();
  const twoManTeams = await getAllTwoManTeams({ page: 1 });
  const { data } = await getAllGolfersList();
  if (!data) notFound();
  if (!twoManTeams.totalPages) twoManTeams.totalPages = 1;
  const { page = "1" } = await searchParams;

  return (
    <div className="space-y-2 flex-1">
      <div className="flex justify-between">
        <h2 className="h2-bold">Two Man Teams</h2>
        <CreateTwoManTeamForm golfers={data} />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
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
                  {twoManTeam?.golfers[0]?.firstName}{" "}
                  {twoManTeam?.golfers[0]?.lastName}
                </TableCell>
                <TableCell>
                  {twoManTeam?.golfers[1]?.firstName}{" "}
                  {twoManTeam?.golfers[1]?.lastName}
                </TableCell>
                <TableCell>
                  {/* <Button className="mr-1" asChild variant="outline" size="sm">
                    <Link href={`/admin/two-man-teams/${twoManTeam.id}`}>
                      Edit
                    </Link>
                  </Button> */}
                  <DeleteDialog id={twoManTeam.id} action={deleteTwoManTeam} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {twoManTeams?.totalPages > 1 ? (
          <Pagination
            page={Number(page) || 1}
            totalPages={twoManTeams?.totalPages}
          />
        ) : (
          <p className="text-muted-foreground">Displaying all results...</p>
        )}
      </div>
    </div>
  );
};

export default AdminTwoManTeamsPage;
