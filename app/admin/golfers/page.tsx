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
  searchParams: Promise<{ page: string }>;
}

const AdminGolfersPage = async ({ searchParams }: PropTypes) => {
  await requireAdmin();
  const golfers = await getAllGolfers({ page: 1 });
  if (!golfers.totalPages) golfers.totalPages = 1;
  const { page = "1" } = await searchParams;

  return (
    <div className="space-y-2 flex-1">
      <div className="flex justify-between">
        <h2 className="h2-bold">Golfers</h2>
        <CreateGolferForm />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
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
                  {golfer.firstName} {golfer.lastName}
                </TableCell>
                <TableCell>{golfer.hci}</TableCell>
                <TableCell>
                  <Badge
                    variant={golfer.twoManTeamId ? "default" : "secondary"}
                  >
                    {golfer.twoManTeamId
                      ? shortenUuid(golfer.twoManTeamId)
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
        {golfers?.totalPages > 1 ? (
          <Pagination
            page={Number(page) || 1}
            totalPages={golfers?.totalPages}
          />
        ) : (
          <p className="text-muted-foreground">Displaying all results...</p>
        )}
      </div>
    </div>
  );
};

export default AdminGolfersPage;
