import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";
import { shortenUuid } from "@/lib/utils";
import Link from "next/link";
import { getAllEvents, deleteEvent } from "@/lib/actions/event.actions";
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
import CreateEventForm from "@/components/admin/create-event-form";
import ResultsSummary from "@/components/admin/results-summary";
import { resolvePageSize } from "@/lib/constants";
import { AdminSearchParams, EventSearchParams } from "@/types";

export const metadata: Metadata = {
  title: "Admin Events",
};

interface PropTypes {
  searchParams: Promise<EventSearchParams>;
}

const AdminEventsPage = async ({ searchParams }: PropTypes) => {
  await requireAdmin();
  const sp = await searchParams;
  const { page = "1", q, size } = sp;
  const pageParam = Number(page);
  const pageSize = resolvePageSize(size);
  const events = await getAllEvents({
    page: pageParam,
    query: q,
    limit: pageSize,
    filters: sp,
  });

  return (
    <div className="space-y-2 flex-1">
      <div className="flex justify-between">
        <h2 className="h2-bold">Events</h2>
        <CreateEventForm />
      </div>
      <div className="overflow-x-auto">
        <ResultsSummary
          totalCount={events.totalCount}
          totalPages={events.totalPages}
          page={pageParam}
          pageSize={pageSize}
          query={q}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TIME</TableHead>
              <TableHead>LOCATION</TableHead>
              <TableHead>DESCRIPTION</TableHead>
              <TableHead>LEAGUE WEEK</TableHead>
              <TableHead>TWO MAN MATCH?</TableHead>
              <TableHead>CHAMPIONSHIP?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.data?.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{shortenUuid(event.id)}</TableCell>
                <TableCell>
                  {event.date.toLocaleDateString("en-US", { timeZone: "UTC" })}
                </TableCell>
                <TableCell>
                  {event.time.toLocaleTimeString("en-US", { timeZone: "EST" })}
                </TableCell>
                <TableCell>{event.location}</TableCell>
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
                  <Badge
                    variant={event.isChampionship ? "default" : "secondary"}
                  >
                    {event.isChampionship ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button className="mr-1" asChild variant="outline" size="sm">
                    <Link href={`/admin/events/${event.id}`}>View</Link>
                  </Button>
                  <DeleteDialog id={event.id} action={deleteEvent} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminEventsPage;
