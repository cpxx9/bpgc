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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { deleteUser, getAllUsers } from "@/lib/actions/user.actions";
import { requireAdmin } from "@/lib/auth-guard";
import { shortenUuid } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CreateUserForm from "@/components/admin/create-user-form";

export const metadata: Metadata = {
  title: "Admin Users",
};

interface PropTypes {
  searchParams: Promise<{ page: string }>;
}

const AdminUsersPage = async ({ searchParams }: PropTypes) => {
  await requireAdmin();
  const users = await getAllUsers({ page: 1 });
  const { page = "1" } = await searchParams;

  return (
    <div className="space-y-2 flex-1">
      <div className="flex justify-between">
        <h2 className="h2-bold">Users</h2>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button>+ Create</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create new user</DialogTitle>
                <DialogDescription>
                  Enter user information here. Click save to create.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <CreateUserForm />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
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
        {users.totalPages > 1 ? (
          <Pagination page={Number(page) || 1} totalPages={users?.totalPages} />
        ) : (
          <p className="text-muted-foreground">Displaying all results...</p>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
