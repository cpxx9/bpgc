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
import CreateGolferForm from "@/components/admin/create-golfer-form";
import { getAllEvents, deleteEvent } from "@/lib/actions/event.actions";

export const metadata: Metadata = {
  title: "Admin Golfers",
};

interface PropTypes {
  searchParams: Promise<{ page: string }>;
}

const AdminEventsPage = async ({ searchParams }: PropTypes) => {
  await requireAdmin();
  const events = await getAllEvents({ page: 1 });
  if (!events.totalPages) events.totalPages = 1;
  const { page = "1" } = await searchParams;

  return (
    <div className="space-y-2 flex-1">
      <div className="flex justify-between">
        <h2 className="h2-bold">Events</h2>
        <CreateGolferForm />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TIME</TableHead>
              <TableHead>LOCATION</TableHead>
              <TableHead>DESCRIPTION</TableHead>
              <TableHead>LEAGUE WEEK</TableHead>
              <TableHead>TWO MAN MATCH</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.data?.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{shortenUuid(event.id)}</TableCell>
                <TableCell>{event.date.toLocaleDateString("en-US")}</TableCell>
                <TableCell>{event.time.toLocaleTimeString("en-US")}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.leagueWeek}</TableCell>
                <TableCell>
                  <Badge
                    variant={event.isTwoManMatch ? "default" : "secondary"}
                  >
                    {event.isTwoManMatch ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button className="mr-1" asChild variant="outline" size="sm">
                    <Link href={`/admin/events/${event.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={event.id} action={deleteEvent} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {events?.totalPages > 1 ? (
          <Pagination
            page={Number(page) || 1}
            totalPages={events?.totalPages}
          />
        ) : (
          <p className="text-muted-foreground">Displaying all results...</p>
        )}
      </div>
    </div>
  );
};

export default AdminEventsPage;
