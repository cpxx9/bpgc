import CreateUserForm from "@/components/admin/create-user-form";
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
import { deleteUser, getAllUsers } from "@/lib/actions/user.actions";
import { requireAdmin } from "@/lib/auth-guard";
import { shortenUuid } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Users",
};

interface PropTypes {
  searchParams: Promise<{ page: string; q?: string }>;
}

const AdminUsersPage = async ({ searchParams }: PropTypes) => {
  await requireAdmin();
  const { page = "1", q } = await searchParams;
  const pageParam = Number(page);
  const users = await getAllUsers({ page: pageParam, query: q });

  return (
    <div className="space-y-2 flex-1">
      <div className="flex justify-between">
        <h2 className="h2-bold">Users</h2>
        <CreateUserForm />
      </div>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-between gap-2 mb-2">
          {users.totalCount > 0 ? (
            <p className="text-muted-foreground">
              {users.totalCount} result{users.totalCount === 1 ? "" : "s"}
              {q ? ` for "${q}"` : ""}
            </p>
          ) : (
            <p className="text-muted-foreground">No search results found...</p>
          )}
        </div>
        {users.totalPages > 1 && (
          <Pagination page={pageParam} totalPages={users.totalPages} />
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{shortenUuid(user.id)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "default" : "secondary"}
                  >
                    {user.role === "admin" ? "Admin" : "User"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button className="mr-1" asChild variant="outline" size="sm">
                    <Link href={`/admin/users/${user.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={user.id} action={deleteUser} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
