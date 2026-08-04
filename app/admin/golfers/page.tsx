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
import { getAllGolfers, deleteGolfer } from "@/lib/actions/golfer.actions";
import { shortenUuid } from "@/lib/utils";
import Link from "next/link";
import CreateGolferForm from "@/components/admin/create-golfer-form";

export const metadata: Metadata = {
  title: "Admin Golfers",
};

interface PropTypes {
  searchParams: Promise<{ page: string; q?: string }>;
}

const AdminGolfersPage = async ({ searchParams }: PropTypes) => {
  await requireAdmin();
  const { page = "1", q } = await searchParams;
  const pageParam = Number(page);
  const golfers = await getAllGolfers({ page: pageParam, query: q });

  return (
    <div className="space-y-2 flex-1">
      <div className="flex justify-between">
        <h2 className="h2-bold">Golfers</h2>
        <CreateGolferForm />
      </div>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-between gap-2 mb-2">
          {golfers.totalCount > 0 ? (
            <p className="text-muted-foreground">
              {golfers.totalCount} result{golfers.totalCount === 1 ? "" : "s"}
              {q ? ` for "${q}"` : ""}
            </p>
          ) : (
            <p className="text-muted-foreground">No search results found...</p>
          )}
        </div>
        {golfers.totalPages > 1 && (
          <Pagination page={pageParam} totalPages={golfers.totalPages} />
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>HCI</TableHead>
              <TableHead>TEAMMATE</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {golfers.data?.map((golfer) => (
              <TableRow key={golfer.id}>
                <TableCell>{shortenUuid(golfer.id)}</TableCell>
                <TableCell>
                  <Badge variant={golfer.active ? "default" : "secondary"}>
                    {golfer.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {golfer.firstName} {golfer.lastName}
                </TableCell>
                <TableCell>{golfer.hci}</TableCell>
                <TableCell>
                  <Badge variant={golfer.twoManTeam ? "default" : "secondary"}>
                    {golfer.twoManTeam
                      ? golfer.twoManTeam.golfers[0].id === golfer.id
                        ? `${golfer.twoManTeam.golfers[1].firstName} ${golfer.twoManTeam.golfers[1].lastName}`
                        : `${golfer.twoManTeam.golfers[0].firstName} ${golfer.twoManTeam.golfers[0].lastName}`
                      : "Solo Player"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button className="mr-1" asChild variant="outline" size="sm">
                    <Link href={`/admin/golfers/${golfer.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={golfer.id} action={deleteGolfer} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminGolfersPage;
